import { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { Bar } from "react-chartjs-2";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

import { Chart as ChartJS, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedMonth) {
      axios
        .get(`http://localhost:5000/api/activities/month/${selectedMonth}`, {
          params: { userId: user._id },
        })
        .then((res) => {
          if (res.status === 200) {
            if (Array.isArray(res.data)) {
              console.log("Activities: ", res.data);
              setActivities(res.data);
              updateChartData(res.data);
              if(res.data.length === 0) {
                setError("No activity data available for this month");
              } else {
                setError("");
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching activities:", error);
          setError("An error occurred while fetching activities."); 
        });
    }
  }, [selectedMonth, user]);

  const updateChartData = (activities = []) => {
    console.log("Activities received for chart:", activities);
    const categories = ["Work", "Study", "Food", "Sleep", "Productivity", "Hobby", "Others"];
    const times = categories.map((category) => {
      const totalTime = activities
        .filter((activity) => activity.category === category)
        .reduce((acc, activity) => {
          const parsedTime = parseFloat(activity.time) || 0;
          console.log(`Category: ${category}, Parsed Time: ${parsedTime}`);
          return acc + parsedTime;
        }, 0);
        console.log(`Category: ${category}, Total Time (minutes): ${totalTime}`);
      return totalTime/60;
    });

    console.log("Times for each :", times);

    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Time Spent (Hours)",
          data: times,
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#FF9F40", "#9966FF", "#FFB6C1"],
          hoverBackgroundColor: ["#5AA8F9", "#FF7A99", "#FFD966", "#63CECE", "#FFB060", "#B079FF", "#FFC4CB"],
          borderWidth: 1,
        },
      ],
    });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setError("");
  };

  const handleClick = () => {
    navigate("/activity-form");
  };

  return (
    <div>
      <Header />
      <div className="p-6 h-[100vh]">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select onChange={handleMonthChange} value={selectedMonth} className="my-4">
          <option value="" disabled>
            Select Month
          </option>
          {Array.from({ length: 12 }).map((_, index) => {
            const month = new Date(0, index).toLocaleString("default", { month: "long" });
            return (
              <option key={index} value={month}>
                {month}
              </option>
            );
          })}
        </select>

        <button
          onClick={handleClick}
          className="ml-4 mt-6 bg-green-700 text-white py-2 px-4 rounded"
        >
          Add Activity
        </button>

        <div className="mt-6">
          {error ? (
            <p className="text-gray-600">{error}</p>
          ) : selectedMonth && activities.length > 0 ? (
            <>
              <h2 className="text-xl font-bold">Your Activity for {selectedMonth}</h2>
              <div style={{ height: "400px", maxWidth: "600px", margin: "auto" }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          font: { size: 14 },
                        },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Time Spent in Each Category (Hours)",
                      },
                    },
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
