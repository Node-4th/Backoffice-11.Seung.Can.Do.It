import express from "express";
import dotenv from "dotenv";

import emailSender from "../utils/nodemailer.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

dotenv.config();

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { emails } = req.body;
  const user = req.user;

  const emailArray = Array.isArray(emails) ? emails : [emails];

  await emailSender(emailArray, user.id);

  return res.status(200).json({ message: "이메일 발송 완료" });
});

export default router;
