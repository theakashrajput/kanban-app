import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { dotenv } from "../config/env.config.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Configuration
app.use(
    cors({
        origin: dotenv.CORS,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.use(errorHandler);

export default app;
