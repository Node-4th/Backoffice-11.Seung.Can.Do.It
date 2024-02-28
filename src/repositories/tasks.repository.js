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

  findProjectByCategory = async (category) => {
    const projects = await this.prisma.projects.findMany({
      where: { category },
    });
    return projects;
  };

  findTaskByProjectId = async (projectId) => {
    const tasks = await this.prisma.tasks.findMany({
      where: { projectId },
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
    return tasks;
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

  updateTask = async (taskId, userId, content, submitUrl) => {
    const updateTask = await this.prisma.tasks.update({
      where: { id: +taskId, userId: +userId },
      data: { content, submitUrl },
    });
    console.log("Aaa", updateTask);
    return updateTask;
  };

  updateTeamTask = async (taskId, teamId, content, submitUrl) => {
    const updateTask = await this.prisma.tasks.update({
      where: { id: +taskId, teamId: +teamId },
      data: { content, submitUrl },
    });
    console.log("Aaa", updateTask);
    return updateTask;
  };

  deleteTask = async (taskId) => {
    const task = await this.prisma.tasks.delete({
      where: { id: +taskId },
    });
    return task;
  };
}
