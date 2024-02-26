import express from 'express';
import { prisma } from '../models/index.js';
import { FeedbacksController } from '../controllers/feedbacks.controller.js';
import { FeedbacksService } from '../services/feedbacks.service.js';
import { FeedbacksRepository } from '../repositories/feedbacks.repository.js';

const router = express.Router();
const feedbacksRepository = new FeedbacksRepository(prisma);
const feedbacksService = new FeedbacksService(feedbacksRepository);
const feedbacksController = new FeedbacksController(feedbacksService);

// 피드백 전체 조회
router.get('/:taskId', feedbacksController.findAllFeedback);

// 피드백 상세 조회
router.get('/:feedbackId', feedbacksController.findFeedback);

// 피드백 생성
router.post('/:taskId', feedbacksController.createFeedback);

// 피드백 수정
router.put('/:feedbackId', feedbacksController.editFeedback);

// 피드백 삭제
router.delete('/:feedbackId', feedbacksController.deleteFeedback);


export default router;