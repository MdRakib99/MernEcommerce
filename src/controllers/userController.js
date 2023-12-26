const {
  userOTPService,
  verifyOTPService,

  saveProfileService,
  readProfileService,
} = require("../services/userService");

exports.userOTP = async (req, res) => {
  let result = await userOTPService(req);
  return res.status(200).json(result);
};

exports.verifyLogin = async (req, res) => {
  let result = await verifyOTPService(req);

  if (result["status"] === "success") {
    // Cookies Option
    let cookiesOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };

    // Set Cookies With Response
    res.cookie("token", result["token"], cookiesOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

exports.userLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};

exports.saveProfile = async (req, res) => {
  let result = await saveProfileService(req);
  return res.status(200).json(result);
};
exports.updateProfile = async (req, res) => {
  let result = await saveProfileService(req);
  return res.status(200).json(result);
};

exports.readProfile = async (req, res) => {
  let result = await readProfileService(req);
  return res.status(200).json(result);
};
