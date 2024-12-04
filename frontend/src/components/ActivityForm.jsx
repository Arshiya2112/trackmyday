import { useEffect, useState } from "react";
import { useAuth } from "../../authContext"
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ActivityForm = ({ date, onActivityChange = () => {} }) => {
    const { user } = useAuth();
    const { activityId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(date || new Date());
    const [isEditing, setIsEditing] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        if(activityId) {
            axios.get(`http://localhost:5000/api/activities/${activityId}`, { params: { userId: user._id }})
            .then((res) => {
                setCategory(res.data.category);
                setDescription(res.data.description);
                setTime(res.data.time);
                setSelectedDate(new Date(res.data.date));
                setIsEditing(true);
            });
        }
    }, [activityId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User Data: ",user);
        if(!user || !user._id) {
            console.error("User is not logged in");
            return;
        }
        const activityData = { category, description, time, date: selectedDate, userId: user._id };
        console.log("Sending data to backend ", activityData);

        if(isEditing) {
            await axios.put(`/api/activities/${activityId}`, activityData);
        } else {
            await axios.post("http://localhost:5000/api/activities",activityData);
        }
        onActivityChange();
        navigate('/view-activities');
    }

    const handleViewClick = () => {
        navigate("/view-activities");
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <>
        <Header/>
        <div className="flex items-center justify-center h-[100vh]  ">
        <div className="w-full max-w-lg p-8 bg-gray-100 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}
        className="space-y-6">

            <div className="space-y-4">

                <label className="block font-semibold text-lg">Select Date</label>
                <div className="flex items-center gap-4">
                <button
                type="button"
                onClick={toggleCalendar}
                className="bg-blue-500 text-white py-3 px-6 rounded-md flex items-center">
                    <FaCalendarAlt className="mr-2"/>
                    {selectedDate.toLocaleDateString()}
                </button>
                </div>
                {showCalendar && (
                    <div className="mt-4">
                
                <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                maxDate={new Date()}
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                />
                </div>
                )}
            

            <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 border rounded-md">
                <option value="" disabled selected>Select Category</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Food">Food</option>
                <option value="Sleep">Sleep</option>
                <option value="Productivity">Productivity</option>
                <option value="Hobby">Hobby</option>
                <option value="Travel">Travel</option>
                <option value="Others">Others</option>
            </select>
            
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-4 border rounded-md resize-none"
            />

            <select value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full p-4 border rounded-md">
                <option value="" disabled selected>Select Time Duration</option>
                <option value="30">30 mins</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
            </select>
            <button type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg">{isEditing ? "Update" : "Add"} Activity</button>
            </div>
        </form>
        <button
        onClick={handleViewClick}
        className="mt-6 bg-green-500 text-white py-3 px-6 rounded-md w-full text-lg">View All</button>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default ActivityForm;