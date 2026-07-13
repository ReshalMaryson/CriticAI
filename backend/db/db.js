const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDB;
