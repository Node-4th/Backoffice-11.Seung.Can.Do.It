export class TeamsRepository {
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

  getProjectByProjectId = async (projectId) => {
    return await this.prisma.projects.findUnique({
      where: {
        id: +projectId,
      },
    });
  };

  getAllTeams = async (orderKey, orderValue) => {
    const teams = await this.prisma.teams.findMany({
      select: {
        id: true,
        name: true,
        projectId: true,
        memberList: true,
      },
      orderBy: [
        {
          [orderKey]: orderValue,
        },
      ],
    });
    return teams;
  };
  getTeamByTeamId = async (teamId) => {
    return await this.prisma.teams.findFirst({
      where: {
        id: +teamId,
      },
      select: {
        name: true,
        projectId: true,
        memberList: true,
      },
    });
  };
  createTeam = async (name, projectId, memberList) => {
    //memberList를 배열 형태로 변환
    const members = Array.isArray(memberList)
      ? memberList
      : memberList.split(",").map((member) => member.trim());

    return await this.prisma.teams.create({
      data: {
        name,
        projectId,
        memberList: members,
      },
    });
  };
  updateTeam = async (teamId, projectId, name, memberList) => {
    //memberList를 배열 형태로 변환
    const members = Array.isArray(memberList)
      ? memberList
      : memberList.split(",").map((member) => member.trim());

    return await this.prisma.teams.update({
      where: {
        id: +teamId,
      },
      data: {
        projectId,
        name,
        memberList: members,
      },
    });
  };
  deleteTeam = async (teamId) => {
    return await this.prisma.teams.delete({
      where: {
        id: +teamId,
      },
    });
  };
}
