// src/routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// test route: add a todo
router.get("/", async (req,res)=>{
  res.send("server is running");
});
router.get("/todo", async (req, res) => {
  try {
    const todo = new Todo({ title: "First Todo" });
    await todo.save();
    res.json({ message: "Todo saved!", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
