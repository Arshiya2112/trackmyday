const express = require("express");
const Activity = require("../models/Activity");
const router = express.Router();

router.post("/", async (req, res) => {
    const { userId, category, description, time, date } = req.body;

    if(!userId || !category || !time || !date) {
        return res.status(400).json({ error: "All required fields must be provided" });
    }

    try {
        const activity = new Activity({ userId, category, description, time, date });
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.get("/", async (req, res) => {
    const { userId } = req.query;
    if(!userId) {
        return res.status(400).json({ error: "UserId is required "});
    }

    try {
        const activities = await Activity.find({ userId }).sort({ date: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if(!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }
        res.json(activity);
    } catch (error) 
    {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedActivity) {
            return res.status(404).json({ error: "Activity not found" });
        }
        res.json(updatedActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteActivity = await Activity.findByIdAndDelete(req.params.id);
        if(!deleteActivity) {
            return res.status(404).json({ error: "Activity not found" });
        }
        res.json(deleteActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/month/:month", async (req, res) => {
    const { userId } = req.query;
    const { month } = req.params; 

    if (!userId || !month) {
        return res.status(400).json({ error: "UserId and Month are required" });
    }

    try {
        const monthNumber = new Date(Date.parse(month + " 1, 2020")).getMonth(); 

        
        const activities = await Activity.find({
            userId,
            date: {
                $gte: new Date(new Date().getFullYear(), monthNumber, 1), 
                $lt: new Date(new Date().getFullYear(), monthNumber + 1, 1), 
            },
        }).sort({ date: -1 });

        if (activities.length === 0) {
            return res.status(200).json([]);
        }

        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;