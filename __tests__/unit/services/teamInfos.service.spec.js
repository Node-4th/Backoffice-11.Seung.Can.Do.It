import { test } from '@jest/globals';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { TeamInfosService } from '../../../src/services/teamInfos.service.js';

describe('TeamInfos Serive Unit Test', () => {
    let mockTeamInfosRepository;
    let teamInfosService;

    beforeEach(() => {
        jest.restoreAllMocks();
        mockTeamInfosRepository = {
            findTeamInfos: jest.fn(),
            findTeam: jest.fn(),
            createTeamInfos: jest.fn(),
            editTeamInfos: jest.fn(),
            deleteTeamInfos: jest.fn()
        };
        teamInfosService = new TeamInfosService(mockTeamInfosRepository);
    });
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

    test('findTeamInfos Method (SUCCESS)', async () => {
        const mockfindTeamInfo = mockTeamInfosRepository.findTeamInfos.mockResolvedValue(teamInfo);

        const findTeamInfos = await teamInfosService.findTeamInfos(teamInfo.teamInfoId);

        expect(findTeamInfos).toEqual(teamInfo);
        expect(mockfindTeamInfo).toHaveBeenCalledWith(teamInfo.teamInfoId);
    });

    test('findTeamInfos Method (Missing TeamInfoId)', async () => {
        await expect(teamInfosService.findTeamInfos(null)).rejects.toThrowError('팀 소개페이지를 선택하세요.');
    });

    test('findTeamInfos Method (No TeamInfo)', async () => {
        mockTeamInfosRepository.findTeamInfos.mockResolvedValue(null);
        await expect(teamInfosService.findTeamInfos(teamInfo.teamInfoId)).rejects.toThrowError('팀 소개페이지가 없습니다.');
    });

    test('findTeam Method (SUCCESS)', async () => {
        const mockfindTeam = mockTeamInfosRepository.findTeam.mockResolvedValue(team);

        const findTeam = await teamInfosService.findTeam(team.teamId, 1);

        expect(findTeam).toEqual(team);
        expect(mockfindTeam).toHaveBeenCalledWith(team.teamId);
    });

    test('findTeam Method (Missing Team)', async () => {
        await expect(teamInfosService.findTeam(null)).rejects.toThrowError('팀을 선택하세요.');
    });

    test('findTeam Method (No Team)', async () => {
        mockTeamInfosRepository.findTeam.mockResolvedValue(null);
        await expect(teamInfosService.findTeam(team.teamId, 1)).rejects.toThrowError('팀이 없습니다.');
    });

    test('findTeam Method (Permission Denied)', async () => {
        mockTeamInfosRepository.findTeam.mockResolvedValue(team);
        await expect(teamInfosService.findTeam(team.teamId, 5)).rejects.toThrowError('팀 소개페이지에 대한 권한이 없습니다.');
    });

    test('createTeamInfos Method (SUCCESS)', async () => {
        const mockcreateTeamInfo = mockTeamInfosRepository.createTeamInfos.mockResolvedValue(teamInfo);

        const createTeamInfos = await teamInfosService.createTeamInfos(
            teamInfo.teamId,
            teamInfo.teamName,
            teamInfo.groundRules,
            teamInfo.goals,
            teamInfo.content
        );

        expect(createTeamInfos).toEqual(teamInfo);
        expect(mockcreateTeamInfo).toHaveBeenCalledWith(
            teamInfo.teamId,
            teamInfo.teamName,
            teamInfo.groundRules,
            teamInfo.goals,
            teamInfo.content
        );
    });

    test('createTeamInfos Method (Missing required values)', async () => {
        await expect(teamInfosService.createTeamInfos('teamId', 'teamName', null, 'goals', 'content')).rejects.toThrowError('필수 값이 입력되지 않았습니다.');
    });

    test('editTeamInfos Method (SUCCESS)', async () => {
        const mockeditTeamInfo = mockTeamInfosRepository.editTeamInfos.mockResolvedValue(teamInfo);

        const editTeamInfos = await teamInfosService.editTeamInfos(
            teamInfo.teamInfoId,
            teamInfo.teamName,
            teamInfo.groundRules,
            teamInfo.goals,
            teamInfo.content
        );

        expect(editTeamInfos).toEqual(teamInfo);
        expect(mockeditTeamInfo).toHaveBeenCalledWith(
            teamInfo.teamInfoId,
            teamInfo.teamName,
            teamInfo.groundRules,
            teamInfo.goals,
            teamInfo.content
        );
    });

    test('editTeamInfos Method (Missing required values)', async () => {
        await expect(teamInfosService.editTeamInfos('teamInfoId', 'teamName', null, 'goals', 'content')).rejects.toThrowError('필수 값이 입력되지 않았습니다.');
    });

    test('deleteTeamInfos Method (SUCCESS)', async () => {
        const mockdeleteTeamInfo = mockTeamInfosRepository.deleteTeamInfos.mockResolvedValue(teamInfo);

        const deleteTeamInfos = await teamInfosService.deleteTeamInfos(teamInfo.teamInfoId);

        expect(deleteTeamInfos).toEqual(teamInfo);
        expect(mockdeleteTeamInfo).toHaveBeenCalledWith(teamInfo.teamInfoId);
    });
});