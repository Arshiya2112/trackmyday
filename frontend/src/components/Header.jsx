import { NavLink, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets.js"
import { useAuth } from "../../authContext.jsx";

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleClick = () => {
        logout();
        navigate("/");
    }
    

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200">
            <h1 onClick={() => navigate("/dashboard")} className="hidden md:flex items-start gap-5 font-extrabold text-4xl text-blue-700 mx-4 cursor-pointer">TrackMyDay</h1>
            <ul className="hidden md:flex items-start gap-20 font-medium">
                <NavLink to="/dashboard">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">DASHBOARD</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to="/activity-form">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">ADD ACTIVITY</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to="/view-activities">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">VIEW ACTIVITIES</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
                <NavLink to="/schedule-tasks">
                    <li className="py-1 hover:scale-105 hover:underline hover:text-blue-900 text-blue-600 text-lg">SCHEDULE TASKS</li>
                    <hr className="border-none outline-none h-0.5 bg-blue-700 w-3/5 m-auto hidden"/>
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img src={assets.dropdown_icon} alt="" className='w-2.5 mx-8' />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-blue-600 text-white rounded flex flex-col gap-4 p-4'>
                                <p onClick={handleClick} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Header