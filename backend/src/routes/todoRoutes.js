const express = require("express");
const router = express.Router();
const { addTodo, getTodos } = require("../controllers/todoController");

router.post("/todo", addTodo);
router.get("/todo", getTodos);

module.exports = router;
