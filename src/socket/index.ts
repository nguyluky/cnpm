import { generateSocketDocs } from "@lib/socket_docs_generator";
import { toSocketRouterSchema, toSocketServer } from "@lib/toSocketRouter";
import { writeFile } from "fs";
import { SocketNotificationController } from "../socket/notifications/controller";
import env from "@src/env";

const socketControllers = [
    SocketNotificationController
];

const socketSchemas = toSocketRouterSchema(socketControllers);

export function setupSocketServer(io: any) {
    // Setup socket server with generated schemas
    toSocketServer(io, socketSchemas);

    // const asy
    const docs = generateSocketDocs(socketControllers);
    docs.servers = [
        {
            url: "ws://localhost:3000",
            description: "Local Socket Server",
        }
    ]
    if (env.NODE_ENV !== "production") {
        writeFile('./docs/socket.json', JSON.stringify(docs, null, 2), (err) => {
            if (err) {
                console.error("Error writing socket.json:", err);
            }
        })
    }

    // Log available namespaces and events
    console.log(`Generated ${socketSchemas.length} socket namespaces`);
    for (const schema of socketSchemas) {
        console.log(`  - ${schema.namespacePath} (${schema.events.length} events)`);
        console.log(`    Auth required: [${schema.namespaceInfo.auth?.map(auth => auth.constructor.name).join(', ')}]`);
        for (const event of schema.events) {
            console.log(`    • ${event.eventName} (${event.eventInfo.type})`);
        }
    }
}
