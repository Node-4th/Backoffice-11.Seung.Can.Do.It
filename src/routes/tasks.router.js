import express from "express";
import { TasksController } from "../controllers/tasks.controllers.js";

const router = express.Router();

const tasksController = new TasksController();

// 과제 제출 API
router.post("/:projectId", tasksController.submitTask);

export default router;
