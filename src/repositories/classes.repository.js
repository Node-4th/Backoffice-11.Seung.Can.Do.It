export class ClassesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  /** 03.01 수정사항
   * getUserByUserId - classId와 role을 같이 return 하도록 수정.
   * createClass - 검증 로직을 서비스 계층으로 옮기고,
   * updateUsersClassId - 추가해서 classId 업데이트는 분리되게 수정.
   */

  getUserByUserId = async (userId) => {
    return await this.prisma.users.findFirst({
      where: {
        id: +userId,
      },
      select: {
        classId: true,
        role: true,
      },
    });
  };

  getClassByName = async (name) => {
    return await this.prisma.class.findFirst({
      where: {
        name: name,
      },
    });
  };

  getClassByClassId = async (classId) => {
    return await this.prisma.class.findFirst({
      where: {
        id: +classId,
      },
      select: {
        name: true,
      },
    });
  };

  createClass = async (name) => {
    return await this.prisma.class.create({
      data: {
        name,
      },
    });
  };

  updateUsersClassId = async (userId, classId) => {
    const updateUser = await this.prisma.users.update({
      where: {
        id: +userId,
      },
      data: {
        classId: classId,
      },
    });
    return updateUser;
  };

  updateClass = async (classId, name) => {
    return await this.prisma.class.update({
      where: {
        id: +classId,
      },
      data: {
        name,
      },
    });
  };

  deleteClass = async (classId) => {
    return await this.prisma.class.delete({
      where: {
        id: +classId,
      },
    });
  };
}
