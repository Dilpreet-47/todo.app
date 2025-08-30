const express = require("express");
const router = express.Router();
const { addTodo, getTodos, deleteTodo } = require("../controllers/todoController");

router.post("/todo", addTodo);
router.get("/todo", getTodos);
router.delete("/todo/:id", deleteTodo);

module.exports = router;
