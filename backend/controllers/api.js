const { Gemini } = require("../services/geminiService");

exports.Generate = async (req, res) => {
  try {
    const {code, language} = req.body;

    const response = await Gemini(code, language);

    res.ststus(200).json({
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