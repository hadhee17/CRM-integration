const express = require("express");
const controller = require("../controller/caseController");
const auth = require("../middleware/protect");
const router = express.Router();

router.post("/cases", auth.protect, controller.createCase);
router.patch("/cases/:id", auth.protect, controller.updateCase);

module.exports = router;
