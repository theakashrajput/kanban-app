import axios from "axios";
import { axiosInstance } from "./axiosInstance"

export const registerUserApi = async (user) => {
    try {
        const { data } = await axiosInstance.post("/user/register", user);
        return data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Registration Failed. Please try again."
        };
    }
};

export const loginUserApi = async (user) => {
    try {
        const { data } = await axiosInstance.post("/user/login", user);
        return data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Login failed. Please try again later."
        }
    }
}

export const verifyMe = async () => {
    try {
        const { data } = await axiosInstance.get("/user/verify");
        return data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Unauthorized request"
        }
    }
};

export const refreshTokensAccessApi = async () => {
    try {
        const { data } = await axios.post("http://localhost:3000/api/v1/user/refresh-token", {}, { withCredentials: true });
        return data;
    } catch (error) {
        // Don't redirect here - let the caller handle the error
        return {
            success: false,
            message: error.response?.data?.message || "Failed to refresh token"
        };
    }
};