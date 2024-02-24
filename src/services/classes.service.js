export class ClassesService {
  constructor(classesRepository) {
    this.classesRepository = classesRepository;
  }
  /** 서비스 계층 패턴
   * 1. Parameter : 서비스 계층에 전달 받는 매개변수
   * 2. 검증 로직(유효성 검사 X)
   * 3. 레파지토리 계층에 DB 사용 요청
   * 4. Return : 컨트롤러 계층에 전달할 데이터
   */
  // role 체크 메서드
  checkAdminRole = async (user) => {
    const foundUser = await this.classesRepository.getUserByUserId(user.userId);
    if (!foundUser) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    return foundUser.role === "admin";
  };

  createClass = async (user, name) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(user);
    if (!isAdmin) {
      throw new Error("관리자만 클래스를 생성할 수 있습니다.");
    }
    // 클래스명 중복 확인
    const isExistClass = await this.classesRepository.getClassByName(name);
    if (isExistClass) {
      throw new Error("이미 존재하는 클래스명입니다.");
    }
    //레파지토리 계층에 클래스 생성 요청
    const createdClass = await this.classesRepository.createClass(user, name);
    //Return
    return createdClass;
  };

  updateClass = async (user, classId, name) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(user);
    if (!isAdmin) {
      throw new Error("관리자만 클래스를 수정할 수 있습니다.");
    }
    // 클래스 존재 확인
    const isExistClass =
      await this.classesRepository.getClassByClassId(classId);
    if (!isExistClass) {
      throw new Error("수정할 클래스가 존재하지 않습니다.");
    }
    //레파지토리 계층에 클래스 수정 요청
    const updatedClass = await this.classesRepository.updateClass(
      classId,
      name,
    );
    //Return
    return updatedClass;
  };

  deleteClass = async (user, classId) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(user);
    if (!isAdmin) {
      throw new Error("관리자만 클래스를 삭제할 수 있습니다.");
    }
    // 클래스 존재 확인
    const isExistClass =
      await this.classesRepository.getClassByClassId(classId);
    if (!isExistClass) {
      throw new Error("삭제할 클래스가 존재하지 않습니다.");
    }
    //레파지토리 계층에 클래스 삭제 요청
    await this.classesRepository.deleteClass(classId);
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
