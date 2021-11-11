const nodemailer = require('nodemailer')

exports.SMTP = async (req, res) => {
  console.log('I am here')
  try{
    const { email, title, content } = req.body
    const transporter = nodemailer.createTransport({
      host: "localhost",
      // host: process.env.SMTP_HOST,
      // service: 'gmail',
      port: process.env.SMTP_PORT,
      // secure: process.env.SMTP_SECURE,
      // auth: {
      //   user: process.env.SMTP_AUTH_USER,
      //   pass: process.env.SMTP_AUTH_PASS,
      // },
    });
    const info = await transporter.sendMail({
      from: process.env.FROM_MAIL_ADDRESS,
      to: email,
      subject: title,
      text: content,
    });
console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));     
    res.json({})
  } catch (err) {
    console.log(`エラー：${err}`);
    res.status(500).send();
  } 
};