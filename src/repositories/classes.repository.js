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
  // 이거 문제있음 class 테이블에서 userId 삭제
  getUserByUserId = async (userId) => {
    return await this.prisma.Users.findFirst({
      where: {
        id: +userId,
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

  createClass = async (userId, name) => {
    const newClass = await this.prisma.class.create({
      data: {
        name,
      },
    });
    const user = await this.prisma.users.update({
      where: {
        id: +userId,
      },
      data: {
        classId: +newClass.id,
      },
    });
    return newClass;
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
