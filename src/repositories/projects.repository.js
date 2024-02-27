export class ProjectsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getUserByUserId = async (userId) => {
    return await this.prisma.users.findFirst({
      where: {
        id: +userId,
      },
    });
  };

  getAllProjects = async (orderKey, orderValue) => {
    const projects = await this.prisma.projects.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        start: true,
        end: true,
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
        start: true,
        end: true,
        createdAt: true,
      },
    });
  };
  createProject = async (title, category, start, end) => {
    // 날짜 형식 변환
    const formattedStart = new Date(start).toISOString();
    const formattedEnd = new Date(end).toISOString();

    return await this.prisma.projects.create({
      data: {
        title,
        category,
        start: formattedStart,
        end: formattedEnd,
      },
    });
  };

  updateProject = async (projectId, title, category, start, end) => {
    // 날짜 형식 변환
    const formattedStart = new Date(start).toISOString();
    const formattedEnd = new Date(end).toISOString();

    return await this.prisma.projects.update({
      where: {
        id: +projectId,
      },
      data: {
        title,
        category,
        start: formattedStart,
        end: formattedEnd,
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
