import { error } from "node:console";
import app from "./app";
import { config } from "./config/env";
import { connectDB, disConnectDB } from "./config/db";
import { connectGraphQL } from "./config/graphQL";


(async function () {
    try {
        // connect DB & GraphQL
        await connectDB();
        await connectGraphQL();
        // Listening server 
        const server = app.listen(config.port, () => {
            console.log(`Multisite API running`);
            console.log(`http://localhost:${config.port}/api`);
            console.log(`Environment: ${config.nodeENV}\n`);
        });
        // Server close 
        const shutDown = async (type: string) => {
            await disConnectDB();
            server.close(() => {
                console.log(`Server is closed, TYPE: ${type}`);
                process.exit(0);
            })
        }
        process.on('SIGINT', () => shutDown("SIGINT"));
        process.on('SIGTERM', () => shutDown("SIGTERM"));
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
})()

