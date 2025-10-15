import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import env from "./env";
import { errorHandler } from "./middleware/error";
import { requestLogger } from "./middleware/requestLogger";
import { apiRouter, swaggerRouter } from "./module";
import { setupSocketServer } from "./socket";
import { Logger } from "./utils/logger";

const logger = new Logger("MAIN");
const app = express();
const httpServer = createServer(app);

// ✅ Cấu hình CORS chính xác cho socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001", // chỉ cho phép frontend này
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // cho phép cookie và header Auth
  },
});
setupSocketServer(io);

// ✅ Cấu hình CORS chính xác cho Express API
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true, // quan trọng nếu bạn gửi cookie hoặc token qua header
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/docs", swaggerRouter);
app.use(apiRouter);

app.get("/health", (_, res) => {
  res.status(200).json({
    code: 200,
    message: "OK",
    name: "HealthCheck",
  });
});

app.use((req, res, _) => {
  res.status(404).json({
    code: 404,
    message: `Not Found - ${req.originalUrl} - ${req.method}`,
    name: "NotFoundError",
  });
});

app.use(errorHandler);

const port = env.PORT;

httpServer.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
