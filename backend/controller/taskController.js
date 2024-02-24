const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const { generateToken, decodeToken } = require("../config/handleToken");

//@description     Get or Search all tasks
//@route           GET /api/task?search=
//@access          Public
const allTasks = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            title: { $regex: req.query.search, $options: "i" },
        }
        : {};
    // console.log(keyword);
    const tasks = await Task.find(keyword).find({ sender: { $eq: req.user._id } });

    res.send(tasks);
});

//@description     Register new task
//@route           POST /api/task/
//@access          Public
const createTask = asyncHandler(async (req, res) => {

    const { title, description, status, deadline } = req.body;
    const sender = req.user._id;

    if (!sender || !title) {
        res.status(400);
        throw new Error("Please Enter all sender and title of your task");
    }

    const task = await Task.create({
        sender,
        title,
        description,
        status,
        deadline
    });

    if (task) {
        res.status(201).json({
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            deadline: task.deadline,
        });
    } else {
        res.status(400);
        throw new Error("Task not found");
    }
});

//@description     Update existing task
//@route           PUT /api/task/
//@access          Protected
const updateTask = asyncHandler(async (req, res) => {
    const { taskId, title, description, deadline, status } = req.body;

    // const sender = req.user._id;
    // const currentTask = await Task.findById(taskId);
    // const output = JSON.stringify(currentTask.sender) == JSON.stringify(sender);

    // if (!output) {
    //     throw new Error("Invalid Authorization");
    // }

    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
            title: title,
            description: description,
            status: status,
            deadline: deadline,
        },
        { new: true }
    );

    if (!updatedTask) {
        res.status(404);
        throw new Error("Task Couldn't Be Updated");
    } else {
        res.json(updatedTask);
    }
});

//@description     Delete existing task
//@route           DELETE /api/task/
//@access          Protected
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
        res.status(404);
        throw new Error("Task Couldn't Be Deleted");
    } else {
        res.json(deletedTask);
    }
});

module.exports = { allTasks, createTask, updateTask, deleteTask };
