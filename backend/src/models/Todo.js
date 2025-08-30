const mongoose = require("mongoose");

// Define schema for tasks
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create one model (collection will be `todos` in MongoDB)
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
