const mongoose = require("mongoose");

// TODO - Complete the TODO schema
const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
  },
);

// module.exports = mongoose.model("Todo", );