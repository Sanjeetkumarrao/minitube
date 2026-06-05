import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const response = await axiosInstance.get("/users/current-user");
            setUser(response.data.data);
            
            localStorage.setItem("user", JSON.stringify(response.data.data));
        } catch (error) {
            setUser(null);
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    };

    const login = async (loginData) => {
        try {
            const response = await axiosInstance.post("/users/login", loginData);
            if (response.data.success) {
                const userData = response.data.data.user;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                return { success: true };
            }
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || "Login failed" 
            };
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/users/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
           
            setUser(null);
            localStorage.removeItem("user");
            window.location.reload();
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchCurrentUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);