import userModel from "../models/user.model.js"
import AppError from "../utils/AppError.js";
import { deleteFromCloud, uploadToCloud } from "../services/imageKit.service.js";
import jwt from "jsonwebtoken";


const generateTokens = async (user) => {
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        const updatedUser = await userModel.findByIdAndUpdate(user._id, { refreshToken }, { new: true, runValidators: true });

        return { accessToken, refreshToken, updatedUser };
    } catch (error) {
        throw new AppError(400, "Error during generating tokens");
    };
}

const extractFileNameAndPath = (url) => {
    try {
        const urlObj = new URL(url);

        const parts = urlObj.pathname.split('/').filter(part => part !== '');

        const imageKitId = parts.shift();

        const fileName = parts.pop();
        return fileName;

    } catch (error) {
        console.error("Invalid URL provided:", error);
        return null;
    }
}

export const registerUserService = async (payload) => {
    let cloudUploadRes;
    const userExist = await userModel.findOne({ $or: [{ userName: payload.userName }, { email: payload.email }] });

    if (userExist) throw new AppError(400, "Credentials are already used");

    if (payload.avatar) {
        try {
            cloudUploadRes = await uploadToCloud(payload.avatar)
        } catch (_) { }
    };

    const user = await userModel.create({
        userName: payload.userName,
        email: payload.email,
        password: payload.password,
        avatar: cloudUploadRes || undefined
    });

    const { accessToken, refreshToken, updatedUser } = await generateTokens(user);

    return { updatedUser, accessToken, refreshToken };
}

export const loginUserService = async (payload) => {
    const user = await userModel.findOne({ $or: [{ userName: payload.userName }, { email: payload.email }] });

    if (!user) throw new AppError(409, "Invalid user credentials");

    const passwordCorrect = await user.comparePassword(payload.password);

    if (!passwordCorrect) throw new AppError(409, "Invalid user credentials");

    const { accessToken, refreshToken, updatedUser } = await generateTokens(user);

    return { accessToken, refreshToken, updatedUser };
}

export const userLogoutService = async (userId) => {
    return await userModel.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } }, { new: true, runValidators: true });
}

export const refreshAccessTokenService = async (incomingRefreshToken) => {
    try {
        const decoded = jwt.verify(incomingRefreshToken, dotenv.REFRESH_TOKEN_SECRET);

        const user = await userModel.findById(decoded._id);

        if (!user) throw new AppError(401, "Invalid refresh token");

        if (incomingRefreshToken !== user.refreshToken) throw new AppError(401, "Refresh token is expired or used");

        const { accessToken, refreshToken } = await generateTokens(user);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new AppError(401, "Invalid refresh token");
    }
}

export const changePasswordService = async (oldPassword, newPassword, userId) => {
    const user = await userModel.findById(userId);

    const passwordCorrect = await user.comparePassword(oldPassword);

    if (!passwordCorrect) throw new AppError(409, "Password is incorrect");

    user.password = newPassword;

    await user.save();

    return true;
};

export const updateUserProfileAvatarService = async (userId, avatar) => {
    let uploadedImage;

    const user = await userModel.findById(userId);

    if (!user) throw new AppError(404, "User not found");

    try {
        uploadedImage = await uploadToCloud(avatar);
    } catch (_) { }

    const oldImage = user.avatar;
    if (oldImage) {
        try {
            const fileName = extractFileNameAndPath(oldImage);
            deleteFromCloud(fileName);
        } catch (_) { }
    }

    user.avatar = uploadedImage;
    const updatedUser = await user.save();

    return updatedUser;
};