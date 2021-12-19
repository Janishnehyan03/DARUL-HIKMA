const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();

exports.sendWelcomeEmail = ({ email, url,firstName }) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "nehyanjanish@gmail.com", // Change to your verified sender
    subject: "Welcome To Darul Hikma",
    text: "Hello, ",
    html: pug.renderFile(`${__dirname}/../views/email/welcome.pug`, {
      firstName: firstName,
      url: url,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("message sent");
      return "message sent";
    })
    .catch((error) => {
      console.error(error);
    });
};

