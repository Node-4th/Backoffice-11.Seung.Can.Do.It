export class ProjectsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 이거 문제있음 projects 테이블에는 userId 없음
  getUserByUserId = async (userId) => {
    return await this.prisma.projects.findFirst({
      where: {
        userId: +userId,
      },
    });
  };

  getAllProjects = async (orderKey, orderValue) => {
    const projects = await this.prisma.projects.findMany({
      select: {
        projectId: true,
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
        projectId: +projectId,
      },
      select: {
        title: true,
        category: true,
        deadline: true,
      },
    });
  };
  createProject = async (title, category, deadline) => {
    return await this.prisma.projects.create({
      data: {
        title,
        category,
        deadline,
      },
    });
  };

  updateProject = async (projectId, title, category, deadline) => {
    return await this.prisma.projects.update({
      where: {
        projectId: +projectId,
      },
      data: {
        title,
        category,
        deadline,
      },
    });
  };

  deleteProject = async (projectId) => {
    return await this.prisma.projects.delete({
      where: {
        projectId: +projectId,
      },
    });
  };
}
