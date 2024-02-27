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

  getSubmitUser = async (category, start) => {
    return await this.prisma.projects.findFirst({
      where: {
        category,
        start,
      },
    });
  };

  getAllNotSubmitUser = async (classId, projectId) => {
    // Projects 테이블을 통해 categoryId와 start date에 해당하는 projectId를 찾습니다.
    const project = await this.prisma.projects.findFirst({
      where: {
        id: projectId,
      },
    });

    // 만약 해당하는 projectId가 없다면 빈 배열을 반환합니다.
    if (!project) return [];

    // Tasks 테이블에서 projectId에 해당하는 task들을 찾습니다.
    const tasks = await this.prisma.tasks.findMany({
      where: {
        projectId,
      },
      select: {
        userId: true, // taskId 대신 userId를 선택합니다.
      },
    });

    // Task들의 userId 목록을 배열로 만듭니다.
    const userIds = tasks.map((task) => task.userId);
    console.log("-----ㄹㄷㄹㄹㄷㄹㄷ", userIds);
    // 해당 projectId에 해당하는 task를 수행하지 않은 유저들을 찾습니다.
    const notSubmitUsers = await this.prisma.users.findMany({
      where: {
        classId,
        id: {
          notIn: userIds, // taskId가 아닌 userId를 비교합니다.
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return notSubmitUsers;
  };
  // getAllNotSubmitUser = async (classId, projectId) => {
  //   return await this.prisma.users.findMany({
  //     where: {
  //       classId,
  //       tasks: {
  //         projectId,
  //       },
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //     },
  //   });
  // };
}
