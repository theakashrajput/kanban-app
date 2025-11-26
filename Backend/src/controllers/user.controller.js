import { asyncWrapper } from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js"
import { registerUserService } from "../services/user.service.js";
import { cookieOptions } from "../../config/cookies.config.js";
import AppResponse from "../utils/AppResponse.js";

export const registerUser = asyncWrapper(async (req, res) => {
    // Take and validate user credential
    // Check if credentials are already not exist in db
    // Task avatar if provided then upload it to imageKit and save returned link
    // Create new user instance in database
    // Generate access and refresh tokens
    // Send a proper response with cookies

    const { userName, email, password } = req.body;
    const avatar = req.file;
    console.log(avatar);
    if (!userName || !email || !password) throw new AppError(400, "All fields are required");

    const { updatedUser, accessToken, refreshToken } = await registerUserService({ userName, email, password, avatar });
    console.log(updatedUser)

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new AppResponse(201, "User created successfully", updatedUser.toSafeObj()));
});