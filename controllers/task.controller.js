const Task = require("../models/task.model");

const createTask = async (req, res) => {
  const { title, status, priority, description, startDate, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newTask = new Task({
      title,
      description,
      startDate: startDate || new Date(),
      deadline,
      status: status || "pending",
      priority: priority || "medium",
      userId: req.user._id,
    });

    const savedTask = await newTask.save();
    const populatedTask = await savedTask.populate("userId", "fullName profilePic");
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("userId", "fullName profilePic").sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, status, priority, description, startDate, deadline } = req.body;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized to update" });
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (startDate) task.startDate = startDate;
    if (deadline) task.deadline = deadline;
    if (status) task.status = status;
    if (priority) task.priority = priority;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized to delete" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
