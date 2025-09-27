const express = require("express");
const controller = require("../controller/customerController");
const auth = require("../middleware/protect");
const router = express.Router();

router.patch("/customers/:id", controller.updateCustomer);
router.delete("/customers/:id", controller.deleteCustomer);
router.post("/customers", controller.createCustomer);
router.get("/customers", controller.getCustomer);

module.exports = router;
