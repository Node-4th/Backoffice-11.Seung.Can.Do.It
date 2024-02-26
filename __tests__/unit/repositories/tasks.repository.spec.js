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
});
