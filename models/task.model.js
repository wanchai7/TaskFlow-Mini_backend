const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "in-progress", "completed"], 
      default: "pending" 
    },
    priority: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      default: "medium" 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model("Task", TaskSchema);
module.exports = TaskModel;
