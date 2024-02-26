import express from "express";
import { TasksController } from "../controllers/tasks.controllers.js";

const router = express.Router();

const tasksController = new TasksController();

// 과제 제출 API
router.post("/:projectId", tasksController.submitTask);

// 카테고리별 과제 API
router.get("/", tasksController.findTaskCategory);

export default router;
