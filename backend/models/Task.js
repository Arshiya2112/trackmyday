const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    task: { type: String, required: true },
    description: { type: String },
    priority: { type: String },
    dueDate: { type: Date },
    status: { type: String, default: 'Pending'}
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;