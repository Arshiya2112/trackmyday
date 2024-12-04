import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar"
import { assets } from "../assets/assets.js"

const Home = () =>  {

    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navbar/>
            <div className="flex flex-col items-center justify-center h-screen bg-white">
                <div className="relative w-full max-w-4xl flex items-center justify-between">
                    <img src={assets.banner}
                    alt="Image"
                    className="animate-slide-in-left h-[350px] md:h-[550px]" />
                    {showText && (
                        <h1 className="text-2xl font-medium text-black text-center animate-slide-in-right">
                            Welcome to <span className="text-blue-700 text-4xl font-bold">TrackMyDay</span>
                            <br /> <br />
                            Keep track of your daily activities for a better lifestyle!
                        </h1>
                    
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Home;