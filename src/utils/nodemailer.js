import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default async function emailSender(emails, template) {
  
  for (const email of emails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎉 Welcome! 환영합니다!`,
      html: template,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email Sent : ", info);
      }
    });
  }
}
