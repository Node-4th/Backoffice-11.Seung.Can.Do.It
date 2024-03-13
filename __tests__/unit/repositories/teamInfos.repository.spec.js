import { test } from "@jest/globals";
import { expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { TeamInfosRepository } from "../../../src/repositories/teamInfos.repository.js";

describe("TeamInfos Repository Unit Test", () => {
  let mockPrisma;
  let teamInfosRepository;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockPrisma = {
      TeamInfos: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      Teams: {
        findFirst: jest.fn(),
      },
    };
    teamInfosRepository = new TeamInfosRepository(mockPrisma);
  });
  const teamInfo = {
    teamInfoId: 1,
    teamId: 1,
    teamName: "teamName",
    groundRules: "groundRules",
    goals: "goals",
    content: "content",
    createdAt: "2024-02-05T06:44:59.380Z",
    updatedAt: "2024-02-05T06:44:59.380Z",
  };
  const team = {
    teamId: 1,
    userId: [1, 2, 3, 4],
    projectId: 1,
    name: "name",
  };

  test("findTeamInfos Method", async () => {
    const mockfindFirst =
      mockPrisma.TeamInfos.findFirst.mockResolvedValue(teamInfo);

    const findTeamInfos = await teamInfosRepository.findTeamInfos(
      teamInfo.teamInfoId,
    );

    expect(findTeamInfos).toEqual(teamInfo);
    expect(mockfindFirst).toHaveBeenCalledWith({
      where: {
        teamInfoId: teamInfo.teamInfoId,
      },
    });
  });

  test("findTeam Method", async () => {
    const mockfindFirst = mockPrisma.Teams.findFirst.mockResolvedValue(team);

    const findTeam = await teamInfosRepository.findTeam(team.teamId);

    expect(findTeam).toEqual(team);
    expect(mockfindFirst).toHaveBeenCalledWith({
      where: {
        teamId: team.teamId,
      },
    });
  });

  test("createTeamInfos Method", async () => {
    const mockcreate = mockPrisma.TeamInfos.create.mockResolvedValue(teamInfo);

    const createTeamInfos = await teamInfosRepository.createTeamInfos(
      teamInfo.teamId,
      teamInfo.teamName,
      teamInfo.groundRules,
      teamInfo.goals,
      teamInfo.content,
    );

    expect(createTeamInfos).toEqual(teamInfo);
    expect(mockcreate).toHaveBeenCalledWith({
      data: {
        teamId: teamInfo.teamId,
        teamName: teamInfo.teamName,
        groundRules: teamInfo.groundRules,
        goals: teamInfo.goals,
        content: teamInfo.content,
      },
    });
  });

  test("editTeamInfos Method", async () => {
    const mockupdate = mockPrisma.TeamInfos.update.mockResolvedValue(teamInfo);

    const editTeamInfos = await teamInfosRepository.editTeamInfos(
      teamInfo.teamId,
      teamInfo.teamName,
      teamInfo.groundRules,
      teamInfo.goals,
      teamInfo.content,
    );

    expect(editTeamInfos).toEqual(teamInfo);
    expect(mockupdate).toHaveBeenCalledWith({
      where: {
        teamInfoId: teamInfo.teamInfoId,
      },
      data: {
        teamName: teamInfo.teamName,
        groundRules: teamInfo.groundRules,
        goals: teamInfo.goals,
        content: teamInfo.content,
      },
    });
  });

  test("deleteTeamInfos Method", async () => {
    const mockdelete = mockPrisma.TeamInfos.delete.mockResolvedValue(teamInfo);

    const deleteTeamInfos = await teamInfosRepository.deleteTeamInfos(
      teamInfo.teamInfoId,
    );

    expect(deleteTeamInfos).toEqual(teamInfo);
    expect(mockdelete).toHaveBeenCalledWith({
      where: {
        teamInfoId: teamInfo.teamInfoId,
      },
    });
  });
});
