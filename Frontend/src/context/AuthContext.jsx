import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loggedInUser = useCallback((userData) => {
        if (!userData) return;
        setUser(userData);
    }, []);

    const logoutUser = useCallback(() => {
        setUser(null);
    }, []);

    const value = {
        user,
        logoutUser,
        loggedInUser
    }

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