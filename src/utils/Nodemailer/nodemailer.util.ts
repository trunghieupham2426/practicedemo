require('dotenv').config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export class MailService {
  async sendUserConfirmation(email: string, token: string) {
    const url = `http:127.0.0.1:5000/api/user/verify/${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Welcome to Madison! Confirm your Email',
      html: `<a href=${url} target="_blank">Click Here To Verify Email</a>`,
    });
  }

  async sendUserForgotPassword(email: string, token: string) {
    const url = `http:127.0.0.1:5000/api/user/resetPassword/${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Reset Password',
      html: `<a href=${url} target="_blank">Click Here To Reset Password</a>`,
    });
  }
}
