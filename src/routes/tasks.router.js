import express from "express";
import { TasksController } from "../controllers/tasks.controllers.js";
import { TasksService } from "../services/tasks.service.js";
import { TasksRepository } from "../repositories/tasks.repository.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { prisma } from "../models/index.js";

const router = express.Router();

const tasksRepository = new TasksRepository(prisma);
const tasksService = new TasksService(tasksRepository);
const tasksController = new TasksController(tasksService);

// 과제 제출 API
router.post("/:projectId", authMiddleware, tasksController.submitTask);

// 카테고리별 과제 API
router.get("/", tasksController.findTaskCategory);

//과제 상세 조회 API
router.get("/:taskId", tasksController.findTask);

//과제 수정 API
router.put("/:taskId", tasksController.updateTask);

//과제 삭제 API
router.delete("/:taskId", authMiddleware, tasksController.deleteTask);

export default router;
