const express = require("express");
const { createTask, getAllTasks, updateTaskById, deleteTaskById } = require("../Controllers/TaskController");

const router = express.Router();

router.post("/create-task", createTask);
router.get("/get-task",getAllTasks);
router.put("/update-Tasks/:id",updateTaskById);
router.post("/delete-task/:id" ,deleteTaskById);

module.exports = router;