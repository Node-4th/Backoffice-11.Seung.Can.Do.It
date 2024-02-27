import express from "express";

/**PrismaORM -> 3계층 의존성 주입 */
import { prisma } from "../models/index.js";
import { ClassesRepository } from "../repositories/classes.repository.js";
import { ClassesService } from "../services/classes.service.js";
import { ClassesController } from "../controllers/classes.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**인스턴스 생성 */
const classesRepository = new ClassesRepository(prisma);
const classesService = new ClassesService(classesRepository);
const classesController = new ClassesController(classesService);

// 클래스 생성, 조회, 수정, 삭제

router.get("/:classId", classesController.getClassByClassId);
router.post("/", authMiddleware, classesController.createClass);
router.put("/:classId", authMiddleware, classesController.updateClass);
router.delete("/:classId", authMiddleware, classesController.deleteClass);

export default router;
