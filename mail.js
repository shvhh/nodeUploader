const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other po  rts
    auth: {
      user: process.env.email, // generated ethereal user
      pass: process.env.pass, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to.join(','), // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview only available when sending through an Ethereal account
}

module.exports = sendMail;
