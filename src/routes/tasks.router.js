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

// 과제-피드백 미제출 목록 조회

/**
 *
 * <controller>
 *
 *  userId = id
 *  req.body - category, start, end
 *
 * <service>
 * 전체 프로젝트 목록 조회 -> projectId 가져와서 category
 * !til 아닌걸 가져오면 개인/팀 과제
 *
 * <repository>
 * task테이블의 모든 taskId 목록을 각각 뽑는다.
 * feedbacks-taskId vs Tasks-id
 * taskId가 없으면 -> 피드백이 없는 task다.
 *
 * 이걸 조회하면, 어드민은 피드백이 없는 과제 전체목록을 확인할 수 있다.
 */

// 카테고리별 과제 API
router.get("/", authMiddleware, tasksController.findTaskCategory);

//과제 상세 조회 API
router.get("/:taskId", authMiddleware, tasksController.findTask);

//과제 수정 API
router.put("/:taskId", authMiddleware, tasksController.updateTask);

//과제 삭제 API
router.delete("/:taskId", authMiddleware, tasksController.deleteTask);

export default router;
