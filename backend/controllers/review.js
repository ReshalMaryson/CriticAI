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


// get the code(prompt) of review.
exports.getPrompt=async (req,res)=>{}

// get 5 most recent reviews of logged in user
exports.getRecentReviews = async (req, res) => {
    console.log(req.id);
  try {
    const reviews = await Review.find({ userId: req.id })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      status: true,
      message: "Latest reviews fetched successfully",
      records: reviews.length,
      data: reviews,
    });
    console.log(req.id);
    
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// delete all review
exports.deleteReview=async(req,res)=>{
  try{
    const deleted = await Review.deleteMany({});
  
     //success response
     res.status(200).json({
      status:true,
      message:"successfully deleted records",
      deleted:deleted
     })
  }catch(err){
   res.status(500).json({
    status:false,
    message:"Server Error : ",
    error:err
   })
  }
}
