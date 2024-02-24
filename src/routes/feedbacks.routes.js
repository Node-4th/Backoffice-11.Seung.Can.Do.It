import express from 'express';
import { prisma } from '../../prisma/index.js';
import { FeedbacksController } from '../controllers/feedbacks.controller.js';
import { FeedbacksService } from '../services/feedbacks.service.js';
import { FeedbacksRepository } from '../repositories/feedbacks.repository.js';

const router = express.Router();
const feedbacksRepository = new FeedbacksRepository(prisma);
const feedbacksService = new FeedbacksService(feedbacksRepository);
const feedbacksController = new FeedbacksController(feedbacksService);

router.get('/', feedbacksController.findFeedback);
router.post('/', feedbacksController.createFeedback);
router.put('/', feedbacksController.editFeedback);
router.delete('/', feedbacksController.deleteFeedback);

export default router;