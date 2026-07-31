//schema
const { default: mongoose } = require("mongoose");
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
  return res.status(200).json({
        status:true,
        message:"reviews fetched successfully",
        records:reviews.length,
        data:reviews,

     })

    }catch(err){        
      return  res.status(500).json({
            status:false,
            message:"Server Error",
            error:err.message
        })
    }
}

// get review by id
exports.getReviewById =async(req,res)=>{
  try{
    const {id}=req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({
          status: "failure",
          message: "Invalid review id",
      });
      }

    const review=await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        status: "failure",
        message: "review not found",
      });
    }
  
   // success response 
   return res.status(200).json({
        status:true,
        message:"review fetched successfully",
        data:review,

     })

  }catch(err){        
     return res.status(500).json({
            status:false,
            message:"Server Error",
            error:err.message
        })

  }
}

// get 5 most recent reviews of logged in user
exports.getRecentReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.id })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(5);

   return res.status(200).json({
      status: true,
      message: "Latest reviews fetched successfully",
      records: reviews.length,
      data: reviews,
    });
    
  } catch (err) {

   return res.status(500).json({
      status: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// get all reviews of logged in user
// get all reviews of logged in user
  exports.getUserReviews = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const reviews = await Review.find({ userId: req.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalRecords = await Review.countDocuments({ userId: req.id });

      return res.status(200).json({
        status: true,
        message: reviews.length === 0 ? "No Reviews Found." : "reviews fetched successfully",
        records: reviews.length,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        data: reviews,
      });
    } catch (err) {
      return res.status(500).json({
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
    return res.status(200).json({
      status:true,
      message:"successfully deleted records",
      deleted:deleted
     })
  }catch(err){
  return res.status(500).json({
    status:false,
    message:"Server Error : ",
    error:err
   })
  }
}
