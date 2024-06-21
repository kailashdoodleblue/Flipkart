var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'mail.tempmail.us.com',
  auth: {
    user: 'mdutdm5ek4hrbd7@tempmail.us.com',
    pass: 'lxxyiywoq0or0kp1f23qqlemcrzbzo'
  }
});

module.exports=transporter;