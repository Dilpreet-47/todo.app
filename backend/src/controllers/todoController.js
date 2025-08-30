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

// ✅ Delete a task
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTask = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try{
    const {id} = req.params;
    const updates = req.body;


    const updateTask = await Todo.findByIdAndUpdate(
      id,
      updates,
      {new : true, runValidators : true}
    );

    if(!updateTask){
      return res.status(404).json({message : "Task not found"});
    }

    res.json(updateTask);
  }catch(error){
    res.send(500).json({ error : error.message });
  }
};