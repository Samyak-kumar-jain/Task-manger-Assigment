const TaskModel = require('../Models/task.js');

const createTask = async (req, res) => {
    try {
        const task = new TaskModel(req.body);
        await task.save();
        res.status(201).json({ message: 'Task created successfully', success: true, task });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tasks', success: false });
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task deleted', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};

const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task updated', success: true, task: updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
};

module.exports = { createTask, getAllTasks, deleteTaskById, updateTaskById };
