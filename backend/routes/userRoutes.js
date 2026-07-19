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
const emailExists = require("../middlewares/user/emailExists");
const {isAdmin} = require("../middlewares/auth/isAdminMiddleware");

//get all users
router.get("/", verifyToken,isAdmin, getAllUsers);

// get the details of JWT verified user
router.get("/me", verifyToken, getVerifiedUser);

//create user
router.post("/",emailExists,createUser);

module.exports = router;
