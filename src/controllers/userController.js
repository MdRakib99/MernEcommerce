const {
  userOTPService,
  verifyOTPService,
  createProfileService,
  updateProfileService,
} = require("../services/userService");

exports.userOTP = async (req, res) => {
  let result = await userOTPService(req);
  return res.status(200).json(result);
};

exports.verifyLogin = async (req, res) => {
  let result = await verifyOTPService(req);
  if (result["status"] === "success") {
    //Set Cookies
    let cookiesOption = {
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: false,
    };

    //Set Cookies With Response
    res.cookie("token", result["token"], cookiesOption);
    return res.status(200).json(result);
  }
  return res.status(200).json(result);
};
exports.userLogout = async (req, res) => {
  let cookiesOption = {
    expires: new Date(Date.now() - 24 * 3600 * 1000),
    httpOnly: false,
  };
  //Set Cookies With Response
  res.cookie("token", "", cookiesOption);
  return res.status(200).json({ status: "success" });
};
exports.createProfile = async (req, res) => {
  let result = await createProfileService(req);
  return res.status(200).json(result);
};
// exports.updateProfile = async (req, res) => {
//   let result = updateProfileService(req);
//   return res.status(200).json(result);
// };
exports.ReadProfile = async (req, res) => {};
