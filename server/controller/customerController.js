const Customer = require("../model/customer");

exports.createCustomer = async (req, res) => {
  const newCust = await Customer.create(req.body);

  res.status(201).json({
    newCust,
  });
};

exports.getCustomer = async (req, res) => {
  const cust = await Customer.find();

  res.status(200).json({
    cust,
  });
};

exports.updateCustomer = async (req, res) => {
  const updateCust = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    updateCust,
  });
};
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Customer deleted",
  });
};
