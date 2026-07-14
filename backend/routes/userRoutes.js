const express = require("express");
const router = express.Router();

//controller
const {
  getAllUsers,
  createUser,
  getVerifiedUser,
} = require("../controllers/users");

// middleware
const verifyToken = require("../middlewares/auth/verifyJWT");

//get all users
router.get("/", verifyToken, getAllUsers);

// get the details of JWT verified user
router.get("/me", verifyToken, getVerifiedUser);

//create user
router.post("/", verifyToken, createUser);

module.exports = router;
