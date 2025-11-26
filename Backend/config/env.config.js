import { config } from "dotenv";
config();

export const dotenv = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    CORS: process.env.CORS_ORIGIN,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET, 
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY, 
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET, 
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY, 
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
};
