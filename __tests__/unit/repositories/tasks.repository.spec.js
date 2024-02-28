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
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      projects: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
      teams: {
        findFirst: jest.fn(),
      },
    };
    tasksRepository = new TasksRepository(mockPrisma);
  });
  const project = {
    projectId: 1,
    title: "제목",
    deadline: "2024-02-26 00:00:00.000",
    createdAt: "2024-02-26 00:00:00.000",
    category: "TIL",
  };
  const projects = [
    {
      projectId: 1,
      title: "title",
      deadline: "2024-02-26 00:00:00.000",
      createdAt: "2024-02-26 00:00:00.000",
      category: "TIL",
    },
    {
      projectId: 2,
      title: "title",
      deadline: "2024-02-26 00:00:00.000",
      createdAt: "2024-02-26 00:00:00.000",
      category: "TEAM_PROJECT",
    },
  ];
  const tasks = [
    {
      taskId: 1,
      userId: 1,
      projectId: 1,
      content: "content",
      submitUrl: "submitUrl",
      createdAt: "2024-02-05T06:44:59.380Z",
      updatedAt: "2024-02-05T06:44:59.380Z",
      projects: {
        title: "til",
      },
    },
    {
      taskId: 2,
      userId: 1,
      projectId: 2,
      content: "content",
      submitUrl: "submitUrl",
      createdAt: "2024-02-05T06:44:59.380Z",
      updatedAt: "2024-02-05T06:44:59.380Z",
      projects: {
        title: "til",
      },
    },
  ];

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

  test("findProjectByCategory Method", async () => {
    const mockfindMany =
      mockPrisma.projects.findMany.mockResolvedValue(projects);

    const findProject = await tasksRepository.findProjectByCategory(
      projects.category,
    );
    expect(mockfindMany).toHaveBeenCalledWith({
      where: { category: projects.category },
    });
    expect(findProject).toEqual(projects);
  });

  test("findTaskByProjectId Method", async () => {
    const mockfindMany = mockPrisma.tasks.findMany.mockResolvedValue(tasks);
    const findTaskByProjectId = await tasksRepository.findTaskByProjectId(
      tasks.projectId,
    );

    expect(mockfindMany).toHaveBeenCalledWith({
      where: { projectId: tasks.projectId },
      select: {
        id: true,
        content: true,
        submitUrl: true,
        projects: {
          select: {
            title: true,
          },
        },
      },
    });

    expect(findTaskByProjectId).toEqual(tasks);
  });

  test("updateTask Method", async () => {
    const task = {
      taskId: 1,
      userId: 1,
      teamId: null,
      projectId: 1,
      content: "content",
      submitUrl: "submitUrl",
      createdAt: "2024-02-05T06:44:59.380Z",
      updatedAt: "2024-02-05T06:44:59.380Z",
    };
    const mockupdate = mockPrisma.tasks.update.mockResolvedValue(task);

    const updateTask = await tasksRepository.updateTask(
      task.taskId,
      task.userId,
      task.content,
      task.submitUrl,
    );

    expect(mockupdate).toHaveBeenCalledWith({
      where: { id: +task.taskId, userId: +task.userId },
      data: {
        content: task.content,
        submitUrl: task.submitUrl,
      },
    });
    expect(updateTask).toEqual(task);
  });

  test("updateTeamTask Method", async () => {
    const task = {
      taskId: 1,
      userId: 1,
      teamId: 1,
      projectId: 1,
      content: "content",
      submitUrl: "submitUrl",
      createdAt: "2024-02-05T06:44:59.380Z",
      updatedAt: "2024-02-05T06:44:59.380Z",
    };
    const mockupdate = mockPrisma.tasks.update.mockResolvedValue(task);

    const updateTeamTask = await tasksRepository.updateTeamTask(
      task.taskId,
      task.teamId,
      task.content,
      task.submitUrl,
    );

    expect(mockupdate).toHaveBeenCalledWith({
      where: { id: +task.taskId, teamId: +task.teamId },
      data: {
        content: task.content,
        submitUrl: task.submitUrl,
      },
    });
    expect(updateTeamTask).toEqual(task);
  });

  test("deleteTask Method", async () => {
    const task = {
      taskId: 1,
      projectId: 1,
      content: "content",
      submitUrl: "submitUrl",
      createdAt: "2024-02-05T06:44:59.380Z",
      updatedAt: "2024-02-05T06:44:59.380Z",
    };
    const mockdelete = mockPrisma.tasks.delete.mockResolvedValue(task);
    const deleteTask = await tasksRepository.deleteTask(task.taskId);

    expect(mockdelete).toHaveBeenCalledWith({ where: { id: +task.taskId } });
    expect(deleteTask).toEqual(task);
  });
});
