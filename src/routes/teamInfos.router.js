import express from 'express';
import { prisma } from '../models/index.js';
import { TeamInfosController } from '../controllers/teamInfos.controller.js';
import { TeamInfosService } from '../services/teamInfos.service.js';
import { TeamInfosRepository } from '../repositories/teamInfos.repository.js';

const router = express.Router();
const teamInfosRepository = new TeamInfosRepository(prisma);
const teamInfosService = new TeamInfosService(teamInfosRepository);
const teamInfosController = new TeamInfosController(teamInfosService);

// 팀정보 상세 조회
router.get('/:teamInfoId', teamInfosController.findTeamInfos);

// 팀정보 생성
router.post('/', teamInfosController.createTeamInfos);

// 팀정보 수정
router.put('/:teamInfoId', teamInfosController.editTeamInfos);

// 팀정보 삭제
router.delete('/:teamInfoId', teamInfosController.deleteTeamInfos);

export default router;