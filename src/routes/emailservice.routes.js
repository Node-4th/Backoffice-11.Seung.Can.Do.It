import express from "express";
import dotenv from "dotenv";
import { SpreadsheetService } from "../services/spread-sheet.service.js";
import { EmailController } from "../controllers/email.controller.js";
import { EmailService } from "../services/emailservice.service.js";

dotenv.config();
const router = express.Router();

const spreadsheetService = new SpreadsheetService(
  process.env.CLIENT_EMAIL,
  process.env.PRIVATE_KEY,
);
const emailService = new EmailService();
const emailController = new EmailController(spreadsheetService, emailService);

router.post("/send-emails", emailController.sendEmails);

export default router;
