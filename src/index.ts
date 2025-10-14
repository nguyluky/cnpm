
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { setupSocketServer } from './socket';
import { Server } from 'socket.io';
import env from './env';
import { errorHandler } from './middleware/error';
import { requestLogger } from './middleware/requestLogger';
import { apiRouter, swaggerRouter } from './module';
import { Logger } from './utils/logger';
import z from 'zod/v4';

const logger = new Logger('MAIN');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    }
})
setupSocketServer(io);

// app.use(exo)
app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger)


app.use('/docs', swaggerRouter)

app.use(apiRouter);
app.get("/health", (_, res) => {
    res.status(200).json({
        code: 200,
        message: 'OK',
        name: 'HealthCheck'
    })
});

app.use((req, res, _) => {
    res.status(404).json({
        code: 404,
        message: `Not Found - ${req.originalUrl} - ${req.method}`,
        name: 'NotFoundError'
    })
});
app.use(errorHandler);

const port = env.PORT;

httpServer.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`)
});
