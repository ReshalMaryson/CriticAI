const express = require("express");
const router = express.Router();

//contoller
const {getallReviews,
    getRecentReviews,
    deleteReview,
    getReviewById}=require("../controllers/review")

//middlewares
const verifyToken = require("../middlewares/auth/verifyJWT");
// const isAdmin = require("../middlewares/auth/isAdmin");

// get all reviews.
router.get("/",verifyToken,getallReviews);

// get 5 most recent reviews of logged in user
router.get("/recent",verifyToken,getRecentReviews);

// get review by id
router.get("/:id",verifyToken,getReviewById);

// delete all reviews
router.delete("/",verifyToken,deleteReview);

module.exports = router;