const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 20, required: true },
    email: {
      type: String,
      required: false,
      maxlength: 30,
      unique: true,
      match: /.+\@.+\..+/, // simple email validation
    },

    password: {
      type: String,
      required: true,
      select: false, //will not be fetched by find()
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
