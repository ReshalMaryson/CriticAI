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

//create user
router.post("/", verifyToken, createUser);

// get the details of JWT verified user
router.get("/me", verifyToken, getVerifiedUser);

module.exports = router;
