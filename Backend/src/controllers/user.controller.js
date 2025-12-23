import { asyncWrapper } from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js";
import {
    changePasswordService,
    loginUserService,
    refreshAccessTokenService,
    registerUserService,
    updateUserProfileAvatarService,
    userLogoutService,
} from "../services/user.service.js";
import { cookieOptions } from "../../config/cookies.config.js";
import AppResponse from "../utils/AppResponse.js";
import userModel from "../models/user.model.js";

export const registerUser = asyncWrapper(async (req, res) => {
    const { userName, email, password } = req.body;
    const avatar = req.file;

    if (!userName || !email || !password)
        throw new AppError(400, "All fields are required");

    const { updatedUser, accessToken, refreshToken } =
        await registerUserService({ userName, email, password, avatar });

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new AppResponse(
                201,
                "User created successfully",
                updatedUser.toSafeObj()
            )
        );
});

export const loginUser = asyncWrapper(async (req, res) => {
    const { userName, email, password } = req.body;

    if ((!userName && !email) || !password)
        throw new AppError(400, "All fields are required");

    const { accessToken, refreshToken, updatedUser } = await loginUserService({
        userName,
        email,
        password,
    });

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new AppResponse(
                200,
                "User logged in successfully",
                updatedUser.toSafeObj()
            )
        );
});

export const logoutUser = asyncWrapper(async (req, res) => {
    const user = req.user;

    if (!user) throw new AppError(401, "Unauthorized request");

    const userInstance = await userLogoutService(user._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new AppResponse(200, "User logout successfully"));
});

export const verifyMe = asyncWrapper(async (req, res) => {
    const user = req.user;
    if (!user) throw new AppError(401, "Unauthorized request");

    const userInstance = await userModel.findById(user._id);

    return res.status(200).json(new AppResponse(200, "Data fetched successfully", userInstance.toSafeObj()));
})

export const refreshAccessToken = asyncWrapper(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) throw new AppError(401, "Unauthorized request");

    const { accessToken, refreshToken } =
        await refreshAccessTokenService(incomingRefreshToken);

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new AppResponse(200, "Access token refreshed"));
});

export const changePassword = asyncWrapper(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!oldPassword || !newPassword)
        throw new AppError(400, "All fields are required");
    if (!user) throw new AppError("Unauthorized request");

    await changePasswordService(oldPassword, newPassword, user._id);

    return res
        .status(200)
        .json(new AppResponse(200, "Password updated successfully"));
});

export const updateProfileAvatar = asyncWrapper(async (req, res) => {
    const avatar = req.file;
    const user = req.user;

    if (!avatar || !user) throw new AppError(401, "Unauthorized request");

    const updatedUserProfile = await updateUserProfileAvatarService(
        user._id,
        avatar
    );

    return res
        .status(200)
        .json(
            new AppResponse(
                200,
                "Avatar image updated successfully",
                updatedUserProfile.toSafeObj()
            )
        );
});
