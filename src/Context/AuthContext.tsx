"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { notifications } from "@mantine/notifications";

interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    signup: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null);

    // Load authentication state from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAuthState = localStorage.getItem("isAuthenticated");

        if (storedUser && storedAuthState === "true") {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");

                if (storedUsers[username] && storedUsers[username] === password) {
                    setUser(username);
                    setIsAuthenticated(true);

                    // Persist user session in localStorage
                    localStorage.setItem("user", username);
                    localStorage.setItem("isAuthenticated", "true");

                    // Show success notification
                    notifications.show({
                        title: "Login Successful",
                        message: `Welcome back, ${username}!`,
                        color: "green",
                    });

                    resolve(true);
                } else {
                    // Show error notification
                    notifications.show({
                        title: "Login Failed",
                        message: "Invalid username or password.",
                        color: "red",
                    });

                    resolve(false);
                }
            }, 500);
        });
    };

    const signup = async (username: string, password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");

                if (!storedUsers[username]) {
                    storedUsers[username] = password;
                    localStorage.setItem("users", JSON.stringify(storedUsers));

                    setUser(username);
                    setIsAuthenticated(true);

                    // Persist user session in localStorage
                    localStorage.setItem("user", username);
                    localStorage.setItem("isAuthenticated", "true");

                    // Show success notification
                    notifications.show({
                        title: "Signup Successful",
                        message: `Welcome, ${username}! Your account has been created.`,
                        color: "green",
                    });

                    resolve(true);
                } else {
                    // Show error notification
                    notifications.show({
                        title: "Signup Failed",
                        message: "Username already exists. Try a different one.",
                        color: "red",
                    });

                    resolve(false);
                }
            }, 500);
        });
    };

    const logout = (): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setUser(null);
                setIsAuthenticated(false);

                // Remove authentication state from localStorage
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");

                // Show success notification
                notifications.show({
                    title: "Logged Out",
                    message: "You have successfully logged out.",
                    color: "blue",
                });
            }, 500);
            resolve(true);
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
