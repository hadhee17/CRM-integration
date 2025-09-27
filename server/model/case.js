const mongoose = require("mongoose");

const caseScheme = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  status: {
    type: String,
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Case = mongoose.model("Case", caseScheme);
module.exports = Case;
