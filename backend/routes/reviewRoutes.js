const express = require("express");
const router = express.Router();


//contoller
const {getallReviews}=require("../controllers/review")

//middlewares
const verifyToken = require("../middlewares/auth/verifyJWT");
// const isAdmin = require("../middlewares/auth/isAdmin");

router.get("/",verifyToken,getallReviews)


module.exports = router;