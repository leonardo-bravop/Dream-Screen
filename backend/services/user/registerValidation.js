const User = require("../../models/User");

exports.validateRegister = (res, password, nickName, email, next) => {
  if (!password) {
    res.status(400);
    next(new Error("Please enter a [3-8] characters password"));
    return;
  }
  if (!nickName) {
    res.status(400);
    next(new Error("Please enter a [2-20] characters nickname"));
    return;
  }
  if (!email) {
    res.status(400);
    next(new Error("Please enter a valid email"));
    return;
  }
  return User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return User.findOne({ where: { nickName } });
      } else {
        return true;
      }
    })
    .then((user) => {
      if (!user) {
        return User.create({ password, nickName, email });
      } else {
        return false;
      }
    });
};
