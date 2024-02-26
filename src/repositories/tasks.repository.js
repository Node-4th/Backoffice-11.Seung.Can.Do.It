import { prisma } from "../models/index.js";

export class TasksRepository {
  findProjectById = async (projectId) => {
    const project = await prisma.projects.findFirst({
      where: { id: +projectId },
    });
    return project;
  };

  findTeamById = async (teamId) => {
    const team = await prisma.teams.findFirst({
      where: { id: +teamId },
    });
    return team;
  };
  submitTask = async (data) => {
    await prisma.tasks.create({
      data,
    });
  };
}
