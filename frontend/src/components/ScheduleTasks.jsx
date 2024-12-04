import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import Footer from "./Footer";

const ScheduleTasks = () => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskFilter, setTaskFilter] = useState("All");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tasks', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTasks(res.data);
            } catch (err) {
                console.error('Error fetching tasks', err);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        const newTask = {
            task,
            description,
            priority,
            dueDate,
            status: "Pending", 
        };
        try {
            const res = await axios.post('http://localhost:5000/api/tasks', newTask, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks([...tasks, res.data]); 
            setTask("");
            setDescription("");
            setPriority("");
            setDueDate(null);
        } catch (err) {
            console.error('Error adding task', err);
        }
    };

    const handleTaskCompletion = (taskId) => {
        axios.patch(`http://localhost:5000/api/tasks/${taskId}/complete`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === taskId ? { ...task, status: "Completed" } : task
                    )
                );
            })
            .catch((err) => console.error("Error marking task as completed", err));
    };

    const handleTaskDeletion = (taskId) => {
        axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            })
            .catch((err) => console.error("Error deleting task", err));
    };

    const filteredTasks = tasks.filter(task => {
        if (taskFilter === "All") return true;
        return task.status === taskFilter;
    });

    const countByPriority = (priority) => tasks.filter(task => task.priority === priority).length;
    const countByStatus = (status) => tasks.filter(task => task.status === status).length;

    const getButtonStyle = (filter) => ({
        backgroundColor: taskFilter === filter ? "#2196f3" : "#f5f5f5",
        color: taskFilter === filter ? "white" : "black",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px 20px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease, color 0.3s ease"
    });

    return (
        <>
            <Header />
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
                    <div style={{ backgroundColor: "#d4f9e2", padding: "15px", borderRadius: "8px", width: "30%" }}>
                        <h3 style={{ color: "#4caf50" }}>Completed</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{countByStatus("Completed")}</p>
                    </div>
                    <div style={{ backgroundColor: "#e1f0fe", padding: "15px", borderRadius: "8px", width: "30%" }}>
                        <h3 style={{ color: "#2196f3" }}>Pending</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{countByStatus("Pending")}</p>
                    </div>
                    <div style={{ backgroundColor: "#ffebee", padding: "15px", borderRadius: "8px", width: "30%" }}>
                        <h3 style={{ color: "#f44336" }}>High Priority</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{countByPriority("High Priority")}</p>
                    </div>
                </div>

                <div style={{ marginTop: "30px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    <textarea
                        placeholder="Add description (optional)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    <DatePicker
                        selected={dueDate}
                        onChange={date => setDueDate(date)}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="dd-mm-yyyy"
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                        customInput={<input style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc" 
                        }} />}
                    />
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}>
                        <option value="" disabled selected>Choose Priority</option>
                        <option value="Low Priority">Low Priority</option>
                        <option value="Medium Priority">Medium Priority</option>
                        <option value="High Priority">High Priority</option>
                    </select>

                    <button
                        onClick={handleAddTask}
                        style={{ backgroundColor: "#2196f3", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        + Add Task
                    </button>
                </div>

                <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
                    <button onClick={() => setTaskFilter("All")} style={getButtonStyle("All")}>All</button>
                    <button onClick={() => setTaskFilter("Pending")} style={getButtonStyle("Pending")}>Active</button>
                    <button onClick={() => setTaskFilter("Completed")} style={getButtonStyle("Completed")}>Completed</button>
                </div>

                <div style={{ marginTop: "20px" }}>
                    {filteredTasks.map((task) => (
                        <div
                        key={task._id}
                        style={{
                            ...taskCardStyle,
                            backgroundColor: task.status === 'Completed' ? "#d4f9e2" : "#ffffff",
                            }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    checked={task.status === "Completed"}
                                    onChange={() => handleTaskCompletion(task._id)}
                                    style={{ marginRight: "10px", cursor: "pointer" }}
                                />
                                <span style={{ fontWeight: "bold" }}>{task.task}</span>
                                <span style={{ marginLeft: "10px", color: "#777" }}>{task.description}</span>
                                <span style={{ marginLeft: "10px", fontSize: "12px", color: "orange", fontWeight: "normal" }}>{task.priority}</span>
                                <span style={{ marginLeft: "10px", fontSize: "12px" }}>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <button
                                onClick={() => handleTaskDeletion(task._id)}
                                className="deleteButton"
                                style={{ marginTop: "10px" }}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

const taskCardStyle = {
    backgroundColor: "#fafafa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

export default ScheduleTasks;
