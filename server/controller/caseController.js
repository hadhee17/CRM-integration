const Case = require("../model/case");

exports.createCase = async (req, res) => {
  const newCase = await Case.create(req.body);

  res.status(201).json({
    newCase,
  });
};

exports.updateCase = async (req, res) => {
  const updateCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    updateCase,
  });
};
