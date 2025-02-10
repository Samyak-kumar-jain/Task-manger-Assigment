const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
})

const TaskModel = mongoose.model("task",taskModel);
module.exports = TaskModel;