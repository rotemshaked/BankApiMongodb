let User = require("../models/users");

const getAllUsers = async () => {
  return await User.find();
};

const getUserByPassportIdAsync = async (passportId) => {
  const user = await User.find({ passportId: passportId });
  return user;
};

const getUserByIdAsync = async (id) => {
  const user = await User.find({ passportId: id });
  return user[0];
};

const addUserAsync = async (user) => {
  const newUser = new User({
    passportId: user.passportId,
    cash: +user.cash,
    credit: +user.credit,
  });

  if (!newUser.cash) {
    newUser.cash = 0;
  }

  if (!newUser.credit) {
    newUser.credit = 0;
  }
  await newUser.save();
  return newUser;
};

const depositAsync = async (sum, userId) => {
  const user = await getUserByIdAsync(userId);
  const successfulDeposit = user.deposit(sum);
  if (successfulDeposit) {
    await user.save();
  }
  user.successfulDeposit = successfulDeposit;
  return user;
};

const updateCreditAsync = async (sum, id) => {
  const user = await getUserByIdAsync(id);
  const creditUpdatedSuccessfully = user.updateCredit(sum);
  if (creditUpdatedSuccessfully) {
    await user.save();
  }
  user.creditUpdatedSuccessfully = creditUpdatedSuccessfully;
  return user;
};

const withdrawAsync = async (sum, id) => {
  const user = await getUserByIdAsync(id);
  const withdrawSuccessfully = user.withdraw(sum);
  if (withdrawSuccessfully) {
    await user.save();
  }
  user.withdrawSuccessfully = withdrawSuccessfully;
  return user;
};

const transferMoneyAsync = async (sum, id, userIdToTrasfer) => {
  const user = await getUserByIdAsync(id);
  const userToTransfer = await getUserByIdAsync(userIdToTrasfer);
  if (!(user.withdraw(sum, true) && userToTransfer.deposit(sum, true))) {
    user.tranferMoneySuccesfully = false;
  } else {
    user.tranferMoneySuccesfully = true;
    user.withdraw(sum);
    userToTransfer.deposit(sum);
    await user.save();
    await userToTransfer.save();
  }
  return user;
};

module.exports = {
  getAllUsers,
  addUserAsync,
  depositAsync,
  updateCreditAsync,
  withdrawAsync,
  transferMoneyAsync,
  getUserByPassportIdAsync,
};
