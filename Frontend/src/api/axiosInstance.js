import axios from "axios";
import { refreshTokensAccessApi } from "./auth.api";
import { redirectToLogin } from "../context/AuthContext";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
    timeout: 5000
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If no response or already on refresh-token endpoint, just reject
        if (!error.response || originalRequest.url.includes("refresh-token")) {
            return Promise.reject(error);
        }

        // If access token expired (401), try to refresh ONCE
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshTokensAccessApi();
                // Retry the original request with new token
                return axiosInstance(originalRequest);
            } catch (err) {
                // If refresh fails (no refresh token or expired), redirect to login
                // BUT only if we're not on verify endpoint (let app handle it)
                if (!originalRequest.url.includes("verify")) {
                    redirectToLogin();
                }
                return Promise.reject(err);
            }
        }
        // For all other errors, just reject
        return Promise.reject(error);
    }
);