const users = require("../BL/users");
const express = require("express");
const {
  getUsersAsync,
  getUserByPassportIdAsync,
  addUserAsync,
  depositAsync,
  updatecreditAsync,
  withdrawAsync,
  transferMoneyAsync,
} = require("../controllers/users");

const userRouter = express.Router();

userRouter.get("/", getUsersAsync);

userRouter.get("/passportId", getUserByPassportIdAsync);

userRouter.post("/", addUserAsync);

userRouter.put("/deposit", depositAsync);

userRouter.put("/updatecredit", updatecreditAsync);

userRouter.put("/withdraw", withdrawAsync);

userRouter.put("/transferMoneyAsync", transferMoneyAsync);

module.exports = userRouter;
