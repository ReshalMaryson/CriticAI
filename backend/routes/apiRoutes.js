const express = require("express");
const router = express.Router();

// controller
const { Generate } = require("../controllers/api");

//middleware
const verifyToken = require("../middlewares/auth/verifyJWT");
const reviewLimiter=require("../middlewares/rateLimit/reviewLimiter");

router.post("/generate", verifyToken,reviewLimiter, Generate);

module.exports = router;

