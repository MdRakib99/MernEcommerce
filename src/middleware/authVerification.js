const { decodeToken } = require("../utility/tokenHelper");

module.exports = (req, res, next) => {
  //Receive Token
  let token = req.cookies["token"];

  // const finalToken = token && token.splice(0, 5);
  console.log(req.cookies);

  // let token = req.cookies["token"];

  //Token Decode
  let decoded = decodeToken(token);

  // Request Header and add email+userId
  if (decoded === null) {
    return res.status(401).json({ status: "failed", message: "Unauthorized" });
  } else {
    let email = decoded["email"];
    let user_id = decoded["user_id"];
    req.headers.email = email;
    req.headers.user_id = user_id;
    next();
  }
};
