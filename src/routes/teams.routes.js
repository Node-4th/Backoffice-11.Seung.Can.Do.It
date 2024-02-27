import express from "express";

/**PrismaORM -> 3계층 의존성 주입 */
import { prisma } from "../models/index.js";
import { TeamsRepository } from "../repositories/teams.repository.js";
import { TeamsService } from "../services/teams.service.js";
import { TeamsController } from "../controllers/teams.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**인스턴스 생성 */
const teamsRepository = new TeamsRepository(prisma);
const teamsService = new TeamsService(teamsRepository);
const teamsController = new TeamsController(teamsService);

// 팀 생성, 조회, 수정, 삭제
router.get("/", authMiddleware, teamsController.getAllTeams);
router.get("/:teamId", authMiddleware, teamsController.getTeamByTeamId);
router.post("/", authMiddleware, teamsController.createTeam);
router.put("/:teamId", authMiddleware, teamsController.updateTeam);
router.delete("/:teamId", authMiddleware, teamsController.deleteTeam);

export default router;
