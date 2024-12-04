import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../authContext.jsx";

const Navbar = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();
    const [token, setToken] = useState(true);

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200">
            <h1 onClick={() => navigate("/")} className="hidden md:flex items-start gap-5 font-extrabold text-4xl text-blue-700 mx-4 cursor-pointer">TrackMyDay</h1>
            <ul className="hidden md:flex items-start gap-20 font-medium pr-36">
                <NavLink to="/">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to="/signup">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">SIGNUP</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to="/login">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">LOGIN</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
            </ul>
        </div>
    )
}

export default Navbar