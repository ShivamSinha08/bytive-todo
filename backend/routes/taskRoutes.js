const express = require("express");
const Task = require("../models/Task");
const { authenticate, checkBlacklist } = require("../middlewares/authenticate");
const router = express.Router();


router.use(checkBlacklist);

// Create a new task
router.post("/tasks", authenticate, async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const task = new Task({
            title,
            description,
            status: status || "pending",
            user: req.user.id, 
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        res.status(500).json({ message: "Failed to create task", error: err.message });
    }
});

// Fetch all tasks for the authenticated user
router.get("/tasks", authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
    }
});

// Fetch a specific task by ID
router.get("/tasks/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({ _id: id, user: req.user.id }); 
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch task", error: err.message });
    }
});

// Update task status by ID
router.put("/tasks/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatus = ["pending", "in-progress", "completed"];

    if (!validStatus.includes(status)) {
        return res.status(400).json({
            message: `Invalid status. Valid statuses are: ${validStatus.join(", ")}`,
        });
    }

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id }, 
            { status },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task status updated", task });
    } catch (err) {
        res.status(500).json({ message: "Failed to update task", error: err.message });
    }
});

// Delete a task by ID
router.delete("/tasks/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.id }); 
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete task", error: err.message });
    }
});

module.exports = router;
