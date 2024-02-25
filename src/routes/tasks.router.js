import express from "express";
import { TasksController } from "../controllers/tasks.controllers.js";

const tasksController = new TasksController();

const router = express.Router();

// 과제 제출 API
router.post("/tasks/:projectId", tasksController.submitTask);
