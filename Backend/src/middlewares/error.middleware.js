import { dotenv } from "../../config/env.config.js";

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode =
        err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

    res.status(statusCode).json({
        status: err.status || "error",
        message: err.message || "Internal server error",
        // 3. CORRECT VARIABLE ACCESS: Use process.env
        stack: dotenv.NODE_ENV === "development" ? err.stack : undefined,
    });
};
