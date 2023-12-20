const nodemailer = require("nodemailer");

const sendEmail = async (emailTo, emailText, emailSubject) => {
  console.log(emailTo, emailText);
  let transport = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });
  let mailOption = {
    from: "Mern Ecommerce <info@teamrabbil.com>",
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };

  return await transport.sendMail(mailOption);
};

module.exports = sendEmail;
