import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { logoutUserApi } from "../api/auth.api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loggedInUser = useCallback((userData) => {
        if (!userData) return;
        setUser(userData);
    }, []);

    const clearState = useCallback(() => {
        setUser(null);
    }, []);

    const logoutUser = useCallback(() => {
        logoutUserApi();
        clearState();
    }, [clearState]);

    const value = useMemo(() => ({
        user,
        logoutUser,
        loggedInUser,
        clearState
    }), [user, loggedInUser, logoutUser, clearState]);

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used in AuthContext Provider.")
    return context;
};

export const redirectToLogin = () => {
    // Redirect to login page - using window.location because this runs from axios interceptor
    // which doesn't have access to React Router's navigate
    window.location.href = "/auth/login";
};