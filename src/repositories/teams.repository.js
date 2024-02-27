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
  createTeam = async (name, userId, projectId, memberList) => {
    return await this.prisma.teams.create({
      data: {
        name,
        projectId,
        memberList,
      },
    });
  };
  updateTeam = async (teamId, name, projectId, memberList) => {
    return await this.prisma.teams.update({
      where: {
        id: +teamId,
      },
      data: {
        name,
        projectId,
        memberList,
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
