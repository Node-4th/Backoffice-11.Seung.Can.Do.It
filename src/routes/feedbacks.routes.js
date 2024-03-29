import express from "express";
import { prisma } from "../models/index.js";
import { FeedbacksController } from "../controllers/feedbacks.controller.js";
import { FeedbacksService } from "../services/feedbacks.service.js";
import { FeedbacksRepository } from "../repositories/feedbacks.repository.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { SlackMessage } from "../../middlewares/slackMessage.js";

const router = express.Router();
const feedbacksRepository = new FeedbacksRepository(prisma);
const feedbacksService = new FeedbacksService(feedbacksRepository);
const slackMessage = new SlackMessage();
const feedbacksController = new FeedbacksController(
  feedbacksService,
  slackMessage,
);

// 피드백 전체 조회
router.get("/:taskId", authMiddleware, feedbacksController.findAllFeedback);

// 피드백 상세 조회
router.get(
  "/task/:feedbackId",
  authMiddleware,
  feedbacksController.findFeedback,
);

// 피드백 생성
router.post("/:taskId", authMiddleware, feedbacksController.createFeedback);

// 피드백 수정
router.put("/:feedbackId", authMiddleware, feedbacksController.editFeedback);

// 피드백 삭제
router.delete(
  "/:feedbackId",
  authMiddleware,
  feedbacksController.deleteFeedback,
);

router.get("/", authMiddleware, feedbacksController.findAllFeedbackByUser);

export default router;
