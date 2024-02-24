// router.js
import express from "express";

/**PrismaORM -> 3계층 의존성 주입 */
import prisma from "../../prisma/index.js";
import { ClassesRepository } from "../repositories/classes.repository.js";
import { ClassesService } from "../services/classes.service.js";
import { ClassesController } from "../controllers/classes.controller.js";

const router = express.Router();

/**인스턴스 생성 */
const classesRepository = new ClassesRepository(prisma);
const classesService = new ClassesService(classesRepository);
const classesController = new ClassesController(classesService);

// 클래스 생성, 조회, 수정, 삭제
router.post("/classes", classesController.createClass);
router.get("/classes", classesController.getAllClasses);
router.put("/classes/:classId", classesController.updateClass);
router.delete("/classes/:classId", classesController.deleteClass);

// 클래스에 유저 초대 및 등록
router.post("/class/:classId/invite", classesController.inviteUserToClass);

// 팀 매칭
router.get("/class/:classId/match-teams", classesController.matchTeams);

// 팀원 정보 확인
router.get("/team/:teamId/members", classesController.getTeamMembers);

export default router;
