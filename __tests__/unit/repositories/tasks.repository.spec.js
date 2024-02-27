import { test } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { TasksRepository } from "../../../src/repositories/tasks.repository.js";

describe("Tasks Repository Unit Test", () => {
  let mockPrisma;
  let tasksRepository;
  beforeEach(() => {
    jest.resetAllMocks();
    mockPrisma = {
      tasks: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      projects: {
        findFirst: jest.fn(),
      },
      teams: {
        findFirst: jest.fn(),
      },
    };
    tasksRepository = new TasksRepository(mockPrisma);
  });

  test("submitTask Method", async () => {
    const data = {
      projectId: 1,
      userId: 1,
      content: "내용",
      submitUrl: "url",
    };
    const result = {
      taskId: 1,
      userId: 1,
      teamId: null,
      projectId: 1,
      content: "내용",
      submitUrl: "url",
      createdAt: "2024-02-26 02:45:11.309",
      updatedAt: "2024-02-26 02:45:11.309",
    };

    mockPrisma.tasks.create.mockReturnValue(result);

    const submitTaskData = await tasksRepository.submitTask(data);
    expect(result).not.toBeUndefined();
  });

  test("findProjectById Method", async () => {
    const project = {
      projectId: 1,
      title: "제목",
      deadline: "2024-02-26 00:00:00.000",
      createdAt: "2024-02-26 00:00:00.000",
      category: "TIL",
    };
    const mockfindFirst =
      mockPrisma.projects.findFirst.mockResolvedValue(project);

    const findProject = await tasksRepository.findProjectById(
      project.projectId,
    );
    expect(mockfindFirst).toHaveBeenCalledWith({
      where: { id: +project.projectId },
    });
    expect(findProject).toEqual(project);
  });

  test("findTeamById Method", async () => {
    const team = {
      teamId: 1,
      userId: 1,
      name: "name",
      projectId: 1,
    };
    const mockfindFirst = mockPrisma.teams.findFirst.mockResolvedValue(team);

    const findTeam = await tasksRepository.findTeamById(team.teamId);
    expect(mockfindFirst).toHaveBeenCalledWith({
      where: { id: +team.teamId },
    });
    expect(findTeam).toEqual(team);
  });
});
