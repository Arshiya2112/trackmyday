const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    description: { type: String },
    time: { type: Number, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);