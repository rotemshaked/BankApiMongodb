const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  passportId: String,
  cash: Number,
  credit: Number,
});

userSchema.methods.deposit = function deposit(sum, whatIf) {
  sum = parseFloat(sum);
  if (sum > 0) {
    if (!whatIf) {
      this.cash += sum;
    }
    return true;
  }
  return false;
};

userSchema.methods.updateCredit = function updateCredit(sum) {
  sum = parseFloat(sum);
  if (sum > 0) {
    this.credit += sum;
    return true;
  }
  return false;
};

userSchema.methods.withdraw = function withdraw(sum, whatIf) {
  sum = parseFloat(sum);
  if (this.cash + this.credit < sum || sum < 0) {
    return false;
  }

  if (this.cash > sum) {
    if (!whatIf) {
      this.cash = this.cash - sum;
    }
    return true;
  }
  if (!whatIf) {
    sum = sum - this.cash;
    this.cash = 0;
    this.credit = this.credit - sum;
  }
  return true;
};

module.exports = mongoose.model("Users", userSchema);
