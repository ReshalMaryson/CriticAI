const { Gemini } = require("../services/geminiService");

exports.test = async (req, res) => {
  try {
    const {code, language} = req.body;

    const response = await Gemini(code, language);
    
    res.json({
      success: true,
      message: response,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};