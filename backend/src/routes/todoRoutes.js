const express = require("express");
const router = express.Router();
const { Todomania, Todomania2 } = require("../models/Todo");

// test route: check server
router.get("/", (req, res) => {
  res.send("server is running");
});

// save into Todomania collection
router.get("/todo", async (req, res) => {
  try {
    const todo = new Todomania({ title: "First Todo" });
    await todo.save();
    res.json({ message: "Todo saved in Todomania!", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// save into Todomania2 collection
router.get("/todo2", async (req, res) => {
  try {
    const todo = new Todomania2({ title: "Second Todo" });
    await todo.save();
    res.json({ message: "Todo saved in Todomania2!", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
