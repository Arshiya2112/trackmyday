import { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const ActivityList = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/activities?userId=${user._id}`).then((res) => {
            setActivities(res.data);
        });
    }, [user]);

    const handleDelete = async (id) => {
        await axios.delete(`/api/activities/${id}`);
        setActivities(activities.filter(activity => activity._id !== id));
    };

    const navigateToEditActivity = (activityId) => {
        navigate(`/activity-form/${activityId}`);
    };

    const navigateToAddActivity = () => {
        navigate("/activity-form");
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center mt-10 p-5 bg-gray-100 rounded-lg shadow-lg w-full h-[100vh]">
                {activities.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">No activities added yet. Click "Add Activity" to start.</p>
                ) : (
                    <div className="w-full space-y-4">
                        <h2>Your Activities</h2>
                        {activities.map((activity, index) => (
                            <div key={activity._id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{index + 1}. {activity.category}</h3>
                                    <p>{activity.description}</p>
                                    <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleString()}</p>
                                </div>
                                <div className="space-x-2">
                                    <button 
                                        onClick={() => navigateToEditActivity(activity._id)} 
                                        className="bg-yellow-500 text-white py-1 px-4 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(activity._id)} 
                                        className="bg-red-500 text-white py-1 px-4 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-4 space-x-4">
                    <button 
                        onClick={navigateToAddActivity}
                        className="bg-blue-500 text-white py-2 px-6 rounded-md"
                    >
                        Add Activity
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ActivityList;
