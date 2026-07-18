const express = require("express");
const server = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes source
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const ConnectDB = require("./db/db");

//cors
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//middlewares
server.use(express.json());
server.use(cookieParser());

// db connect
ConnectDB();

// server routes.
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/api", apiRoutes);

//server start
server.listen(5000, () => {
  console.log("live");
  //   console.log(mongoose.modelNames());
});
