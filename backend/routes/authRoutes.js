const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// controllers
const { Login, Logout, refreshToken } = require("../controllers/auth");

router.post("/login", Login);

// --------------logout with JWT + sessions + cookies + refresh token---------
router.post("/logout", Logout);

// -------------refresh token route----------------
router.post("/refresh", refreshToken);

module.exports = router;
