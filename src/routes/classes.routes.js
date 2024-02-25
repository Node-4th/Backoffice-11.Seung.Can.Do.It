import express from "express";

/**PrismaORM -> 3계층 의존성 주입 */
import { prisma } from "../models/index.js";
import { ClassesRepository } from "../repositories/classes.repository.js";
import { ClassesService } from "../services/classes.service.js";
import { ClassesController } from "../controllers/classes.controller.js";

const router = express.Router();

/**인스턴스 생성 */
const classesRepository = new ClassesRepository(prisma);
const classesService = new ClassesService(classesRepository);
const classesController = new ClassesController(classesService);

// 클래스 생성, 조회, 수정, 삭제

router.get("/classes", classesController.getAllClassesByInvitedUser);
router.get("/classes/:classId", classesController.getClassByClassId);
router.post("/classes", classesController.createClass);
router.put("/classes/:classId", classesController.updateClass);
router.delete("/classes/:classId", classesController.deleteClass);

export default router;
