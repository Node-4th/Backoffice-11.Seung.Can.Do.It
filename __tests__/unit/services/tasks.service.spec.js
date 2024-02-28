import { describe } from "@jest/globals";
import { expect } from "@jest/globals";
import { test } from "@jest/globals";
import { beforeEach } from "@jest/globals";
import { jest } from "@jest/globals";
import { TasksService } from "../../../src/services/tasks.service.js";

describe("Tasks Service Unit Test", () => {
  let mockTasksRepository;
  let tasksService;

  beforeEach(() => {
    jest.resetAllMocks();
    mockTasksRepository = {
      submitTask: jest.fn(),
      findProjectById: jest.fn(),
      findTeamById: jest.fn(),
    };
    tasksService = new TasksService(mockTasksRepository);
  });
  const task = {
    taskId: 1,
    userId: 1,
    teamId: 1,
    projectId: 1,
    content: "내용",
    submitUrl: "url",
    createdAt: "2024-02-26 02:45:11.309",
    updatedAt: "2024-02-26 02:45:11.309",
  };
  const project = {
    projectId: 1,
    title: "제목",
    deadline: "2024-02-26 00:00:00.000",
    createdAt: "2024-02-26 00:00:00.000",
    category: "TIL",
  };
  const team = {
    teamId: 1,
    userId: 1,
    name: "name",
    projectId: 1,
  };

  test("submitTask Method (SUCCESS)", async () => {
    mockTasksRepository.submitTask.mockResolvedValue(task);
    mockTasksRepository.findProjectById.mockResolvedValue(project);
    mockTasksRepository.findTeamById.mockResolvedValue(team);

    const submitTask = await tasksService.submitTask(
      task.taskId,
      task.userId,
      task.teamId,
      task.projectId,
      task.content,
      task.submitUrl,
    );
    expect(submitTask).toEqual(task);
    expect(mockTasksRepository.findProjectById).toHaveBeenCalledWith(
      task.projectId,
    );
    expect(mockTasksRepository.findTeamById).toHaveBeenCalledWith(task.teamId);
  });

  test("submitTask Method (projectId Missing)", async () => {
    mockTasksRepository.findProjectById.mockResolvedValue(undefined);
    await expect(tasksService.submitTask(2)).rejects.toThrowError(
      "프로젝트 조회에 실패하였습니다.",
    );
  });

  test("submitTask Method (teamId Missing)", async () => {
    mockTasksRepository.findProjectById.mockResolvedValue(1);
    mockTasksRepository.findTeamById.mockResolvedValue(null);
    await expect(tasksService.submitTask(1, 1, 1)).rejects.toThrowError(
      "팀 조회에 실패하였습니다.",
    );
  });
});
