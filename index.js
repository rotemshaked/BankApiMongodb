const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../api/models/users");
const path = require("path");
const userRouter = require("./routes/users");
require("dotenv").config();

const publicPath = path.join(__dirname, "./client/build");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));
app.use("/users", userRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

// const publicPath = "../client/build";
// app.use(express.static(), publicPath);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is up and running on port ${process.env.PORT || 8080}`)
);
