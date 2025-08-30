const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/", todoRoutes);

module.exports = app;
