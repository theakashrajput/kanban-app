class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "Fail" : "error";
        Error.captureStackTrace(this, this.stack);
    }
};

export default AppError;