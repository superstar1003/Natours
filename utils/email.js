const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const mailgun = require('nodemailer-mailgun-transport');

//new Email(user, url).sendWelcome()

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'Subhash Chandra <process.env.EMAIL_FORM';
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid
      var stmpConfig = {
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // secure: false,
        service: 'Mailgun',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
          // clientId: '',
          // clientSecret: '',
          // refreshToken: '',
          // accessToken: '',
        },
      };
      return nodemailer.createTransport(stmpConfig);
      // mailgun({
      //   auth: {
      //     api_key: '6277e1565c38b65c225ba186bce77979-360a0b2c-0e6160a6',
      //     domain: 'sandbox454e36cf80f14cb3a31986db06d74590.mailgun.org',
      //   },
      //   //proxy: 'http://127.0.0.1:8000',
      // })

      // {
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    //1.Render Html based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    //2.Define the email option
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    //3. Create a transport and send email

    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the natours family!');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid only for 10 mins'
    );
  }
};

//const sendEmail = async (options) => {
//1. Create a transporter
//2. Define email options
//3. Actually send the email by nodemailer
//};
