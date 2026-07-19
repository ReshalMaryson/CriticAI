const express = require("express");
const router = express.Router();

// controller
const { Generate } = require("../controllers/api");

//middleware
const verifyToken = require("../middlewares/auth/verifyJWT");

router.post("/generate", verifyToken, Generate);

module.exports = router;

