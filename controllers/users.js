const { send } = require("express/lib/response");
const UsersBL = require("../BL/users");
const internalServerErrorMessage = "Internal server Error";
const youDontHaveEnoughMoneyMessage = "You don't have enough money";
const incorrectSumMessage = "Incorrect sum";

const getUsersAsync = async (req, res) => {
  try {
    const users = await UsersBL.getAllUsers();
    console.log("users **** server ", users);
    res.status(200).send(users);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const getUserByPassportIdAsync = async (req, res) => {
  try {
    const userPassportId = req.body.passportId;
    if (!userPassportId) {
      res.status(400).send("Invalid passportId");
    }
    const user = await UsersBL.getUserByPassportIdAsync(userPassportId);
    if (!user) {
      res.status(404).send("There is no such user");
    }
    res.send(user);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const addUserAsync = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await UsersBL.addUserAsync(user);
    if (!newUser) {
      res.status(404).send("There is no such user");
    }
    res.send(newUser);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const depositAsync = async (req, res) => {
  try {
    let sum = req.body.sum;
    let id = req.body.passportId;
    const user = await UsersBL.depositAsync(sum, id);
    if (user.successfulDeposit) {
      res.send(user);
    } else {
      res.status(400).send(incorrectSumMessage);
    }
  } catch (error) {
    res.status(500).send(internalServerErrorMessage);
  }
};

const updatecreditAsync = async (req, res) => {
  try {
    let sum = req.body.sum;
    let id = req.body.passportId;
    const user = await UsersBL.updateCreditAsync(sum, id);
    if (user.creditUpdatedSuccessfully) {
      res.send(user);
    } else {
      res.status(400).send(incorrectSumMessage);
    }
  } catch (error) {
    res.status(500).send(internalServerErrorMessage);
  }
};

const withdrawAsync = async (req, res) => {
  try {
    let sum = req.body.sum;
    let id = req.body.passportId;
    const user = await UsersBL.withdrawAsync(sum, id);
    if (user.withdrawSuccessfully) {
      res.send(user);
    } else {
      res.status(400).send(youDontHaveEnoughMoneyMessage);
    }
  } catch (error) {
    res.status(500).send(internalServerErrorMessage);
  }
};

const transferMoneyAsync = async (req, res) => {
  try {
    let sum = req.body.sum;
    let id = req.body.passportId;
    let userIdToTrasfer = req.body.userIdToTrasfer;
    console.log(sum, id, userIdToTrasfer);
    const user = await UsersBL.transferMoneyAsync(sum, id, userIdToTrasfer);
    if (user.tranferMoneySuccesfully) {
      res.send(user);
    } else {
      res.status(400).send(incorrectSumMessage);
    }
  } catch (error) {
    res.status(500).send(internalServerErrorMessage);
  }
};

module.exports = {
  getUsersAsync,
  getUserByPassportIdAsync,
  addUserAsync,
  depositAsync,
  updatecreditAsync,
  withdrawAsync,
  transferMoneyAsync,
};
