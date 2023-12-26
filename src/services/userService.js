const sendEmail = require("../utility/emailHelper");
const userModel = require("../models/userModel");
const { encodeToken } = require("../utility/tokenHelper");
const profileModel = require("../models/profileModel");

const userOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);

    let EmailText = `Your Verification Code is= ${code}`;
    let EmailSubject = "Email Verification";

    await sendEmail(email, EmailText, EmailSubject);

    await userModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );

    return { status: "success", message: "6 Digit OTP has been send" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const verifyOTPService = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    // User Count
    let total = await userModel.find({ email: email, otp: otp }).count("total");
    if (total === 1) {
      // User ID Read
      let user_id = await userModel
        .find({ email: email, otp: otp })
        .select("_id");

      // User Token Create
      let token = encodeToken(email, user_id[0]["_id"].toString());

      // OTP Code Update To 0
      await userModel.updateOne({ email: email }, { $set: { otp: "0" } });

      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (e) {
    return { status: "fail", message: "Invalid OTP" };
  }
};

const saveProfileService = async (req) => {
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
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const readProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await profileModel.find({ userID: user_id });
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", message: error };
  }
};

module.exports = {
  userOTPService,
  verifyOTPService,

  saveProfileService,

  readProfileService,
};
