import mongoose from "mongoose"
import { config } from "./env"

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("MongoDB connected"));
        mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));
        mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));

        await mongoose.connect(config.mongoURL);
    } catch (error) {
        console.error("DB connection failed", error);
        process.exit(1);
    }
}

export const disConnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.error("DB disconnection failed", error);
        process.exit(1);
    }
}