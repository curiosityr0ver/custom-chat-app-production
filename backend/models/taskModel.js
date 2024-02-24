const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        status: { type: Boolean, default: false },
        deadline: { type: Date, default: new Date() }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
