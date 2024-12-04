const express = require('express');
const Task = require('../models/Task');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const { task, description, priority, dueDate } = req.body;
    try {
        const newTask = new Task({
            user: req.user._id,
            task,
            description,
            priority,
            dueDate
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching tasks', error: err.message });
    }
});

router.put('/:taskId', authenticate, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: 'Error updating task', error: err.message });
    }
});

router.delete('/:taskId', authenticate, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting task', error: err.message });
    }
});

router.patch('/:taskId/complete', authenticate, async (req, res) => {
    try {
        const completedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            { status: "Completed" },
            { new: true }
        );
        res.json(completedTask);
    } catch (err) {
        res.status(400).json({ message: "Error completing task", error: err.message });
    }
});

module.exports = router;