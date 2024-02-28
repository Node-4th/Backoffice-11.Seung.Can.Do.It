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

export default async function emailSender(emails, userId) {
  const template = `
  <html>
    <head>
    <title>🎉 환영합니다! 🎉</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background-color: #007bff;
      color: #fff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    
    .content {
      padding: 20px;
      text-align: center;
    }
    
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #0056b3;
    }
    
    .footer {
      background-color: #f8f8f8;
      padding: 20px;
      text-align: center;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    
    .emoji {
      font-size: 40px;
      vertical-align: middle;
    }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1><span class="emoji">🎉</span> 환영합니다! <span class="emoji">🎉</span></h1>
      </div>
      <div class="content">
        <p><strong></strong>님, 환영합니다!

        <p> 웹사이트를 방문해주세요.</p>

        <a href="http://localhost:3000/sign-up?role=student&adminId=${userId}" class="button">방문하기</a>
      </div>
      <div class="footer">
        <p>도움이 필요하시면 언제든지 문의해주세요. 즐거운 하루 되세요!🥕</p>
      </div>
    </div>
  </body>
  </html>
`;

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
