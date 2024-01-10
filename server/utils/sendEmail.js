import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM_EMAIL, // sender address
  //   to: email, // user email
  //   subject: subject, // Subject line
  //   html: message, // html body
  // });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: message,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // rethrow the error to propagate it up the call stack
  }

};

export default sendEmail;
