const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({});

module.exports = mongoose.model("comment", commentSchema);
