require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/users");

const publicPath = path.join(__dirname, "./client/build");

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));
app.use("/users", userRouter);

app.use("*", (req, res) => {
  res.send("this route is not defind");
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is up and running on port ${process.env.PORT || 8080}`)
);
