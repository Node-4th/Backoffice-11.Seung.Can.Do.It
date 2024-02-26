import nodemailer from "nodemailer";

export class EmailService {
  async sendEmails(emailList) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

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
            <p><strong>${nickname}</strong>님, 환영합니다!

            <p>${claasName} 웹사이트를 방문해주세요.</p>

            <a href="http://localhost:3018/sign-up" class="button">방문하기</a>
          </div>
          <div class="footer">
            <p>도움이 필요하시면 언제든지 문의해주세요. 즐거운 하루 되세요!🥕</p>
          </div>
        </div>
      </body>
      </html>
    `;

      for (const email of emailList) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `🎉 Welcome! 환영합니다!`,
          html: template,
        };

        await transporter.sendMail(mailOptions);
      }
      console.log("Nodemailer 이메일 발송 성공");
    } catch (error) {
      console.error("Nodemailer 이메일 발송 실패:", error);
      throw new Error("Nodemailer 이메일 발송 실패");
    }
  }
}
