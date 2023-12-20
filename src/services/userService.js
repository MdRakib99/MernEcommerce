const sendEmail = require("../utility/emailHelper");
const userModel = require("../models/userModel");
const { encodeToken } = require("../utility/tokenHelper");
const profileModel = require("../models/profileModel");

const userOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let emailText = `Your Veification Code is =${code}`;
    let emailSubject = "Email Verification";
    console.log(code);
    await sendEmail(email, emailText, emailSubject);
    await userModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", message: "6 Digit OTP Code has been send" };
  } catch (error) {
    return { status: "fail", message: error.toString() };
  }
};
const verifyOTPService = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;
    // User Count
    let countUser = await userModel.find({ email: email, otp: otp }).count();
    if (countUser === 1) {
      // Read user id
      let user_id = await userModel
        .find({ email: email, otp: otp })
        .select("_id");

      // User token create
      let token = encodeToken(email, user_id[0]["_id"].toString());
      // Updated otp code to O
      await userModel.updateOne({ email: email }, { $set: { otp: "0" } });
      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "failed", message: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "failed", message: "Invalid OTP" };
  }
};
// const LogoutService = async (req) => {};
// const createProfileService = async (req) => {
//   let user_id = req.headers.user_id;
//   let reqBody = req.body;
//   reqBody.userID = user_id;

//   await profileModel.updateOne(
//     { userID: user_id },
//     { $set: reqBody },
//     { upsert: true }
//   );
//   return { status: "success", message: "Profile Save Success" };
// };

const createProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    await profileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );

    return { status: "success", message: "Profile Save Success" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const readProfileService = async (req) => {};

module.exports = {
  userOTPService,
  verifyOTPService,
  //   LogoutService,
  createProfileService,

  readProfileService,
};
