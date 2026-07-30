const rateLimit = require("express-rate-limit");

const reviewLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  standardHeaders: true, 
  legacyHeaders: false,

  keyGenerator: (req) => req.id,

  handler: (req, res) => {
    res.status(429).json({
      status: false,
      message: "Too many review requests. Please wait a moment and try again.",
      error: "rate_limit_exceeded",
    });
  },
});

module.exports = reviewLimiter;