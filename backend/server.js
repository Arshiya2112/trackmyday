const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const activityRoutes = require("./routes/activityRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/activities", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks",taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
