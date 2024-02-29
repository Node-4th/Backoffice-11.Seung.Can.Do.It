import express from "express";
import dotenv from "dotenv";
import emailSender from "../utils/nodemailer.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

dotenv.config();

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { emails } = req.body;
  const user = req.user;
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

        <a href="http://localhost:3000/signup?role=student&adminId=${user.id}" class="button">방문하기</a>
      </div>
      <div class="footer">
        <p>도움이 필요하시면 언제든지 문의해주세요. 즐거운 하루 되세요!🥕</p>
      </div>
    </div>
  </body>
  </html>
`;
  const emailArray = Array.isArray(emails) ? emails : [emails];

  await emailSender(emailArray, template);

  return res.status(200).json({ message: "이메일 발송 완료" });
});

export default router;
