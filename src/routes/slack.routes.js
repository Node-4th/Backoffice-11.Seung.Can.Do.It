import express from "express";
import dotenv from "dotenv";
import slackSender from "../utils/slackSender.js";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    await slackSender(text);

    return res.status(200).json({ message: "슬랙으로 메세지 발송완료" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
