import { useState } from "react";
import { useAuth } from "../../authContext"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Login Successful!");
            navigate("/dashboard");
        } catch (error) {
            alert("Login Failed!" + error.message);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="bg-gray-50 h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit}
        className="bg-white rounded-lg w-full max-w-md shadow-md border border-blue-500 p-8">
            <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">Login</h1>

            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </label>
                    <input
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none" />
                </div>

                <div>
                <label htmlFor="password" className="block mb-1 font-medium">
                        Password
                </label>
                <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none" />
                </div>
            </div> 
            <button type="submit"
            className="mt-6 w-full bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition">Login</button>
            <span className="text-sm">Don't have an account? <a href="/signup" className="text-blue-400 underline">Signup</a></span>
        </form>
        </div>
        <Footer/>
        </>
    );
};

export default Login