const mongoose = require("mongoose");

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

const todoSchema2 = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Export both models
const Todomania = mongoose.model("Todomania", todoSchema);
const Todomania2 = mongoose.model("Todomania2", todoSchema2);

module.exports = { Todomania, Todomania2 };
