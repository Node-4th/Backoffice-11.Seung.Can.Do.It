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
    };
    tasksService = new TasksService(mockTasksRepository);
  });
  const task = {
    taskId: 1,
    userId: 1,
    teamId: null,
    projectId: 1,
    content: "내용",
    submitUrl: "url",
    createdAt: "2024-02-26 02:45:11.309",
    updatedAt: "2024-02-26 02:45:11.309",
  };

  test("submitTask Method", async () => {
    mockTasksRepository.submitTask.mockResolvedValue(task);

    const submitTask = await tasksService.submitTask(
      task.taskId,
      task.userId,
      task.teamId,
      task.projectId,
      task.content,
      task.submitUrl,
    );
    expect(submitTask).toEqual(task);
  });
});
