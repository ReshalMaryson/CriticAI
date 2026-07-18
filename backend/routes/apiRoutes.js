const express = require("express");
const router = express.Router();

// controller
const { test } = require("../controllers/api");

router.post("/test", test);

module.exports = router;

