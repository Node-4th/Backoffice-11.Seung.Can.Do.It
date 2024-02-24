export class ClassesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  /** 레파지토리 계층 패턴
   * 1. Parameter : 서비스 계층에 전달 받는 매개변수
   * 2. DB 사용 로직
   *  3. Return : 서비스 계층에 전달할 데이터
   *
   */

  getUserById = async (userId) => {
    return await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
  };

  createClass = async (adminUserId, className) => {
    return await this.prisma.class.create({
      data: {
        name: className,
        userId: adminUserId,
      },
    });
  };

  inviteUserToClass = async (classId, userId, role) => {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== role) {
      return null;
    }

    return await this.prisma.users.update({
      where: { id: userId },
      data: {
        class: {
          connect: { id: classId },
        },
        role: role,
      },
    });
  };

  matchTeams = async (classId) => {
    const studentsInClass = await this.prisma.users.findMany({
      where: {
        AND: [{ class: { id: classId } }, { role: "STUDENT" }],
      },
    });

    return teams;
  };

  getTeamMembers = async (teamId) => {
    return await this.prisma.teams.findUnique({
      where: { id: teamId },
      include: { users: true },
    }).users;
  };
}
