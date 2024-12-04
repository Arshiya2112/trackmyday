import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if(token) {
            axios
            .get("http://localhost:5000/api/users/me",
                { headers: { Authorization: `Bearer ${token}` },
             }
            )
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
        }
    }, [token]);

    const login = (email, password) => {
        return axios
        .post("http://localhost:5000/api/users/login", { email, password })
        .then((res) => {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            setToken(token);
            setUser(user);
        });
    };

    const signup = (username, email, password) => {
        return axios.post("http://localhost:5000/api/users/signup", { username, email, password });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};