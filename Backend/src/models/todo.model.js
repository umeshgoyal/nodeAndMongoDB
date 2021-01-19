const mongoose = require("mongoose");

// FIXME - Add React ME like comments
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    pending: {
      type: Boolean,
    },
  }
);

module.exports = mongoose.model("Todos", todoSchema);
