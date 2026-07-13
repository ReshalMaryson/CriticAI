const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

//controller
const { getAllUsers, createUser } = require("../controllers/users");

//get all users
router.get("/", getAllUsers);

//create user
router.post("/", createUser);

module.exports = router;
