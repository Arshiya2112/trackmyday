import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../authContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import PublicRoute from "./components/PublicRoute";
import ScheduleTasks from "./components/ScheduleTasks";

function App () {
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PublicRoute><Home/></PublicRoute>}/>
                    <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>}/>
                    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                    <Route path="/activity-form" element={<ProtectedRoute><ActivityForm/></ProtectedRoute>}/>
                    <Route path="/activity-form/:activityId" element={<ProtectedRoute><ActivityForm/></ProtectedRoute>}/>
                    <Route path="/view-activities" element={<ProtectedRoute><ActivityList/></ProtectedRoute>}/>
                    <Route path="/schedule-tasks" element={<ProtectedRoute><ScheduleTasks/></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;