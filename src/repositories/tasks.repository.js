export class TasksRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  findProjectById = async (projectId) => {
    const project = await this.prisma.projects.findFirst({
      where: { id: +projectId },
    });
    return project;
  };

  findTeamById = async (teamId) => {
    const team = await this.prisma.teams.findFirst({
      where: { id: +teamId },
    });
    return team;
  };
  submitTask = async (data) => {
    const submitTask = await this.prisma.tasks.create({
      data,
    });
    return submitTask;
  };

  findTask = async (taskId) => {
    const task = await this.prisma.tasks.findFirst({
      where: { id: +taskId },
    });
    return task;
  };

  deleteTask = async (taskId, userId) => {
    const task = await this.prisma.tasks.delete({
      where: { id: +taskId, userId },
    });
    return task;
  };
}
