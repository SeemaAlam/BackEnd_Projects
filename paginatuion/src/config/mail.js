const nodemailer = require("nodemailer");

// const {CURRENT_ENVIORNMENT, SMTP_USERNAME, SMTP_PASS}=process.env;

require("dotenv").config();

module.exports=nodemailer.createTransport({
    host: process.env.CURRENT_ENVIORNMENT="development" ? "smtp.mailtrap.io" : "",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASS,

      // user: SMTP_USERNAME,
      // pass: SMTP_PASS,
    },
  });