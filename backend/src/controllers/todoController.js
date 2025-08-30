const Todo = require("../models/Todo");

// Add new task
exports.addTodo = async (req, res) => {
  try {
    const newTask = new Todo({ title: req.body.title });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
exports.getTodos = async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
