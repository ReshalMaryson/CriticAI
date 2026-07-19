//schema
const Review=require("../models/reviewSchema");

// get all reviews
exports.getallReviews=async(req,res)=>{
    try{
     const reviews=await Review.find().populate("userId");
     if(reviews.lenght==0){
        res.status(404).json({
            status:false,
            message:"failed to fetch reviews"
        })
     }

     // success response 
     res.status(200).json({
        status:true,
        message:"reviews fetched successfully",
        records:reviews.length,
        data:reviews,

     })

    }catch(err){
        console.log(err);
        
        res.status(500).json({
            status:false,
            message:"Server Error",
            error:err.message
        })
    }
}
