export class ProjectsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getUserByUserId = async (userId) => {
    return await this.prisma.users.findFirst({
      where: {
        userId: userId,
      },
    });
  };

  getAllProjects = async (orderKey, orderValue) => {
    const projects = await this.prisma.projects.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        deadline: true,
        // user: {
        //   select: {
        //     name: true,
        //   },
        // },
        createdAt: true,
      },
      orderBy: [
        {
          [orderKey]: orderValue,
        },
      ],
    });
    return projects;
  };

  getProjectByTitle = async (title) => {
    return await this.prisma.projects.findFirst({
      where: {
        title: title,
      },
    });
  };

  getProjectByProjectId = async (projectId) => {
    return await this.prisma.projects.findFirst({
      where: {
        id: +projectId,
      },
      select: {
        title: true,
        category: true,
        deadline: true,
        createdAt: true,
      },
    });
  };
  createProject = async (title, category, deadline) => {
    return await this.prisma.projects.create({
      data: {
        title,
        category,
        deadline: new Date(deadline), // dateFormat(new DAte("2022-02-27"))
      },
    });
  };

  updateProject = async (projectId, title, category, deadline) => {
    return await this.prisma.projects.update({
      where: {
        id: +projectId,
      },
      data: {
        title,
        category,
        deadline: new Date(deadline),
      },
    });
  };

  deleteProject = async (projectId) => {
    return await this.prisma.projects.delete({
      where: {
        id: +projectId,
      },
    });
  };
}
