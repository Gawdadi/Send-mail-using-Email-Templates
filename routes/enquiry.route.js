const express = require("express"),
  router = express.Router(),
  enquiryController = require("../controllers/enquiry.controller");

router.post("/", enquiryController.create);

module.exports = router;
