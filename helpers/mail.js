const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports.sendMail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail(
    {
      from: 'HT hotel',
      to: email,
      subject: subject,
      html: message,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        // console.log('Email sent: ', info.response);
      }
    }
  );
};
