import { test } from '@jest/globals';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { TeamInfosController } from '../../../src/controllers/teamInfos.controller.js';

describe('TeamInfos Controller Unit Test', () => {
    let mockTeamInfosService;
    let teamInfosController;
    let mockReq, mockRes;

    beforeEach(() => {
        jest.restoreAllMocks();
        mockTeamInfosService = {
            findTeamInfos: jest.fn(),
            findTeam: jest.fn(),
            createTeamInfos: jest.fn(),
            editTeamInfos: jest.fn(),
            deleteTeamInfos: jest.fn()
        };
        mockReq = { params: {}, body: {}, user: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis()
        };
        teamInfosController = new TeamInfosController(mockTeamInfosService);
    });
    const mocknext = jest.fn();
    const teamInfo = {
        teamInfoId: 1,
        teamId: 1,
        teamName: 'teamName',
        groundRules: 'groundRules',
        goals: 'goals',
        content: 'content',
        createdAt: '2024-02-05T06:44:59.380Z',
        updatedAt: '2024-02-05T06:44:59.380Z'
    };
    const team = {
        teamId: 1,
        userId: [1, 2, 3, 4],
        projectId: 1,
        name: 'name'
    };

    test('findTeamInfos Method', async () => {
        mockReq.params = {
            teamInfoId: teamInfo.teamInfoId
        }
        const mockfindTeamInfo = mockTeamInfosService.findTeamInfos.mockResolvedValue(teamInfo);

        await teamInfosController.findTeamInfos(mockReq, mockRes, mocknext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ data: teamInfo});
        expect(mockfindTeamInfo).toBeCalledWith(
            teamInfo.teamInfoId
        );
    });

    test('createTeamInfos Method', async () => {
        mockReq.params = {
            teamId: teamInfo.teamId
        };
        mockReq.body = {
            teamName: teamInfo.teamName, 
            groundRules: teamInfo.groundRules, 
            goals: teamInfo.goals, 
            content: teamInfo.content
        };
        mockReq.user = {
            userId: 1
        };

        const mockfindTeam = mockTeamInfosService.findTeam.mockResolvedValue(team);
        const mockcreateTeamInfo = mockTeamInfosService.createTeamInfos.mockResolvedValue(teamInfo);

        await teamInfosController.createTeamInfos(mockReq, mockRes, mocknext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: 'true', 
            message: '팀 소개페이지를 작성하였습니다.'
        });
        expect(mockfindTeam).toBeCalledWith(
            team.teamId,
            1
        );
        expect(mockcreateTeamInfo).toBeCalledWith(
            teamInfo.teamId,
            teamInfo.teamName,
            teamInfo.groundRules,
            teamInfo.goals,
            teamInfo.content
        );
    });

    test('editTeamInfos Method', async () => {
        mockReq.params = {
            teamInfoId: teamInfo.teamInfoId
        };
        mockReq.body = {
            teamName: teamInfo.teamName, 
            groundRules: teamInfo.groundRules, 
            goals: teamInfo.goals, 
            content: teamInfo.content
        };
        mockReq.user = {
            userId: 1
        };

        const mockfindTeamInfo = mockTeamInfosService.findTeamInfos.mockResolvedValue(teamInfo);
        const mockfindTeam = mockTeamInfosService.findTeam.mockResolvedValue(team);
        const mockeditTeamInfo = mockTeamInfosService.editTeamInfos.mockResolvedValue(teamInfo);

        await teamInfosController.editTeamInfos(mockReq, mockRes, mocknext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: 'true', 
            message: '팀 소개페이지를 수정했습니다.', 
            data: teamInfo
        });
        expect(mockfindTeamInfo).toHaveBeenCalledWith(teamInfo.teamInfoId);
        expect(mockfindTeam).toHaveBeenLastCalledWith(
            team.teamId,
            1
        );
        expect(mockeditTeamInfo).toHaveBeenCalledWith(
            teamInfo.teamId,
            teamInfo.teamName,
            teamInfo.groundRules,
            teamInfo.goals,
            teamInfo.content
        );
    });

    test('deleteTeamInfos Method', async () => {
        mockReq.params = {
            teamInfoId: teamInfo.teamInfoId
        };
        mockReq.user = {
            userId: 1
        };

        const mockfindTeamInfo = mockTeamInfosService.findTeamInfos.mockResolvedValue(teamInfo);
        const mockfindTeam = mockTeamInfosService.findTeam.mockResolvedValue(team);
        const mockdeleteTeamInfo = mockTeamInfosService.deleteTeamInfos.mockResolvedValue(teamInfo);

        await teamInfosController.deleteTeamInfos(mockReq, mockRes, mocknext);

        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: 'true', 
            message: '팀 소개페이지를 삭제했습니다.'
        });
        expect(mockfindTeamInfo).toHaveBeenCalledWith(teamInfo.teamInfoId);
        expect(mockfindTeam).toHaveBeenLastCalledWith(
            team.teamId,
            1
        );
        expect(mockdeleteTeamInfo).toHaveBeenCalledWith(teamInfo.teamInfoId);
    });
});