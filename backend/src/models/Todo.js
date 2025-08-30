const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    completed :{
        type: Boolean,
        default: false,
    },
});

const todoSchema2 = new mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    completed :{
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Todomania", todoSchema);
module.exports = mongoose.model("Todomania2", todoSchema2);