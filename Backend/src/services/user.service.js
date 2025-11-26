import userModel from "../models/user.model.js"
import AppError from "../utils/AppError.js";
import { uploadToCloud } from "../services/imageKit.service.js";

const generateTokens = async (user) => {
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        const updatedUser = await userModel.findByIdAndUpdate(user._id, { refreshToken });

        return { accessToken, refreshToken, updatedUser };
    } catch (error) {
        throw new AppError(400, "Error during generating tokens");
    };
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

