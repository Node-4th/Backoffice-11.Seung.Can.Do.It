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

  // getProjectInfos = async (category, start, end) => {
  //   return await this.prisma.projects.findFirst({
  //     where: {
  //       category,
  //       start,
  //       end,
  //     },
  //   });
  // };

  getAllNotSubmitUser = async (category, start, end, classId) => {
    // projectId로 프로젝트 정보 조회
    const project = await this.prisma.projects.findFirst({
      where: {
        category,
        start,
        end,
      },
    });
  };

  getAllNotSubmitUser = async (category, start, end, classId) => {
    // projectId로 프로젝트 정보 조회
    const project = await this.prisma.projects.findFirst({
      where: {
        category,
        start,
        end,
      },
    });
    // 만약 해당하는 projectId가 없다면 빈 배열을 반환합니다.
    if (!project) return [];
    // projectId에 해당하는 Tasks 테이블에서 userId 조회한 결과
    const tasks = await this.prisma.tasks.findMany({
      where: {
        id: +project.id,
      },
      select: {
        userId: true, //taskId가 아닌 userId
      },
    });
    // 순회하면서 배열 형태로 프로젝트 참가인원의 전체 목록을 생성
    const userIdLists = tasks.map((task) => task.userId);
    // userIdLists Console.log
    console.log("Repository - 프로젝트 참가자 List:", userIdLists);
    /** 미제출자 목록 추출
     * 1. Users 테이블을 조회해서 classId가 있지만,
     * 2. Tasks 테이블에서 조회한 userIdLists 배열과 비교해서
     * 3. tasks.userId가 없는 사람은 과제를 미제출한 사람이기 때문에
     * 4. notIn으로 userIdLists를 제외시키고,
     * 5. Users 테이블에 있는 userId와 name을 조회해서 반환
     */
    const notSubmitUsers = await this.prisma.users.findMany({
      where: {
        classId,
        id: {
          notIn: userIdLists, // Users-userId - Tasks-userLists-userId = 미제출자 목록
        },
      },
      select: {
        classId: true,
        id: true,
        name: true,
        email: true,
      },
    });
    return notSubmitUsers;
  };

  getAllNotSubmitTeams = async (category, start, end, classId) => {
    const project = await this.prisma.projects.findFirst({
      where: {
        category,
        start,
        end,
      },
    });

    if (!project) return [];

    const tasks = await this.prisma.tasks.findMany({
      where: {
        projectId: +project.id,
      },
      select: {
        teamId: true,
      },
    });

    const teamIdLists = tasks.map((task) => task.teamId);
    console.log("레포tasks", tasks);
    console.log("레포teamIdLists", teamIdLists);

    // teamIdLists Console.log
    console.log("Repository - 프로젝트 참가 팀 List:", teamIdLists);

    const notSubmitTeams = await this.prisma.teams.findMany({
      where: {
        projectId: +project.id,
        id: {
          notIn: teamIdLists, // Teams-teamId - Tasks-userLists-userId = 미제출자 목록
        },
      },
    });

    return notSubmitTeams;
  };
}
