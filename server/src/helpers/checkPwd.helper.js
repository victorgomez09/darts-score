const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const checkPwd = async (userID, userMail, userPWD) => {
  try {
    console.log('userID', userID)
    console.log('userMail', userMail)
    const user = await userModel
      .findOne({
        $or: [{ userID: userID }, { userMail: userMail }],
        verified: false
      })
      .exec();

    const isPWDValid = await bcrypt.compare(userPWD, user.userPWD);

    return isPWDValid;
  } catch (error) {
    console.error(error);

    return false;
  }
};

module.exports = checkPwd;
