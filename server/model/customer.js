const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  status: { type: String, default: "active" },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
