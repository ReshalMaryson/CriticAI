const { Gemini } = require("../services/geminiService");

// Schemas
const Review=require("../models/reviewSchema")

exports.Generate = async (req, res) => {
  try {
    const {code, language} = req.body;
    
  if(!code ||!language || code.trim()===""||language.trim()===""){
    res.status(400).json({
      status:false,
      message:"code and lanuage are required",
      error:"invalid request body"
    })
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


    res.status(200).json({
      status: true,
      message: response,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message:"failed to generate response",
      error:err.message
    });
  }
};