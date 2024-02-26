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

  getUserByUserId = async (userId) => {
    return await this.prisma.class.findFirst({
      where: {
        userId: +userId,
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
        classId: +classId,
      },
      select: {
        name: true,
      },
    });
  };
  createClass = async (name) => {
    return await this.prisma.class.create({
      data: {
        name: name,
      },
    });
  };

  updateClass = async (classId, name) => {
    return await this.prisma.class.update({
      where: {
        classId: +classId,
      },
      data: {
        name: name,
      },
    });
  };

  deleteClass = async (classId) => {
    return await this.prisma.class.delete({
      where: {
        classId: +classId,
      },
    });
  };
}
