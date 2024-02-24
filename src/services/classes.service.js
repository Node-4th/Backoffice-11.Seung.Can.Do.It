export class ClassesService {
  constructor(classesRepository) {
    this.classesRepository = classesRepository;
  }
  /** 서비스 계층 패턴
   * 1. Parameter : 서비스 계층에 전달 받는 매개변수
   * 2. 검증 로직(유효성 검사 X)
   * 3. 레파지토리 계층에 DB 사용 요청
   * 4. Return : 컨트롤러 계층에 전달할 데이터
   *
   */
  verifyUserAdmin = async (userId) => {
    const user = await this.classesRepository.getUserById(userId);
    if (!user || user.role !== "admin") {
      throw new Error("관리자만 클래스를 생성할 수 있습니다.");
    }
  };
  createClass = async (userId, className) => {
    return await this.classesRepository.createClass(userId, className);
  };

  inviteUserToClass = async (classId, userId, role) => {
    return await this.classesRepository.inviteUserToClass(
      classId,
      userId,
      role,
    );
  };

  matchTeams = async (classId) => {
    return await this.classesRepository.matchTeams(classId);
  };

  getTeamMembers = async (teamId) => {
    return await this.classesRepository.getTeamMembers(teamId);
  };
}
