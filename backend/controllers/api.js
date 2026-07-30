const { Gemini } = require("../services/geminiService");

// Schemas
const Review=require("../models/reviewSchema")

// create a review.
exports.Generate = async (req, res) => {
  try {
    const {code, language} = req.body;
    
  if(!code ||!language || code.trim()===""||language.trim()===""){
   return res.status(400).json({
      status:false,
      message:"code and lanuage are required",
      error:"invalid request body"
    })
  }

  const MAX_CODE_LENGTH = 40000;
  if (code.length > MAX_CODE_LENGTH) {
    return res.status(413).json({
      status: false,
      message: `Code exceeds maximum allowed length of ${MAX_CODE_LENGTH} characters`
    });
  }

    const response = await Gemini(code, language);

    // save the response in the database.
     const createdReview=await Review.create({
        userId:req.id,
        language,
        code,
        result:response,
        usage:response.usage,

     })
    return res.status(200).json({
          status: true,
          message: response,
        });
  } catch (err) {
// timeout
  if (err.message === "GEMINI_TIMEOUT") {
    return res.status(504).json({
      status: false,
      message: "The review is taking longer than expected. Please try again.",
      error: "gemini_timeout",
    });
  }
// server failure response
      return  res.status(500).json({
      success: false,
      message:"failed to generate response",
      error:err.message
    });
  }
};
