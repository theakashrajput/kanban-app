import { dotenv } from "../../config/env.config.js";
import userModel from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncWrapper(async (req, res, next) => {
    const token =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new AppError(401, "Unauthorized request");

    try {
        const decoded = jwt.verify(token, dotenv.ACCESS_TOKEN_SECRET);

        const user = await userModel.findById(decoded._id);

        if (!user) throw new AppError(401, "Invalid access token");

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new AppError(401, "Access token expired");
        }
        throw new AppError(401, "Invalid access token");
    }
});
