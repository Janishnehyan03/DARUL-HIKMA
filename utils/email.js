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

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `Janish Nehyan ${process.env.EMAIL_FROM}`;
//   }
//   newTransport() {
//     if (process.env.NODE_ENV === "production") {
//       //sendGrid
//       return nodemailer.createTransport({
//         service: "SendGrid",
//         auth: {
//           user: process.env.SEND_GRID_USERNAME,
//           pass: process.env.SEND_GRID_PASSWORD,
//         },
//       });
//     }
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }
//   async send(template, subject) {
//     //1) render HTML based on pug
//     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//       firstName: this.firstName,
//       url: this.url,
//       subject,
//     });
//     // 2) define Email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject: subject,
//       html,
//       text: htmlToText.fromString(html),
//     };
//     // 3) create a trasport and send
//     await this.newTransport().sendMail(mailOptions); //sendMail is build in function
//   }
//   async sendWelcome() {
//     await this.send("welcome", "welcome to natours family");
//   }

//   async sendPasswordReset() {
//     await this.send(
//       "passwordReset",
//       "Your password reset token (valid for 10 minutes)"
//     );
//   }
// };
