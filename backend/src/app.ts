import express from "express"
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { config } from "./config/env";
import rateLimit from "express-rate-limit";
import siteRouter from "./routes/sIte.routes";

dotenv.config();
const app = express();


app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
    origin: config.clientURL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests, please try again later." },
})

app.use(globalRateLimit);
app.use(express.json({ limit: "2mb" }));

app.use("/api/site", siteRouter);

app.get('/api', (_req, res) => {
    res.status(200).send({ success: true, status: "ok", data: "Welcome to multisite API", timestamp: new Date().toISOString() })
});

app.get('/api/health', (_req, res) => {
    res.status(200).send({ success: true, status: "ok", timestamp: new Date().toISOString() })
});

export default app;