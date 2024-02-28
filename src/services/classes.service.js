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
  checkAdminRole = async (userId) => {
    const isAdmin = await this.classesRepository.getUserByUserId(userId);
    if (!isAdmin) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    if (isAdmin.role !== "ADMIN") {
      throw new Error("관리자에게만 허용된 권한입니다.");
    }
    return isAdmin;
  };
  getClassByClassId = async (classId) => {
    const myClass = await this.classesRepository.getClassByClassId(classId);
    if (!classId) throw new Error("존재하지 않는 클래스입니다.");
    return myClass;
  };

  createClass = async (userId, name) => {
    //Parameter - user.role이 admin인지 검증하기
    await this.checkAdminRole(userId);

    // 클래스명 중복 확인
    const isExistClassByName =
      await this.classesRepository.getClassByName(name);
    if (isExistClassByName) {
      throw new Error("이미 존재하는 클래스명입니다.");
    }

    //레파지토리 계층에 클래스 생성 요청
<<<<<<< HEAD
    const createdClass = await this.classesRepository.createClass(name);
=======
    const createdClass = await this.classesRepository.createClass(userId, name);
>>>>>>> 512500e68dbfc0286a7d6914b7bb750d9d40a6b9

    //Return
    return createdClass;
  };

  updateClass = async (userId, classId, name) => {
    //Parameter - user.role이 admin인지 검증하기
    await this.checkAdminRole(userId);
    // 클래스 존재 확인
    await this.getClassByClassId(classId);

    //레파지토리 계층에 클래스 수정 요청
    const updatedClass = await this.classesRepository.updateClass(
      classId,
      name,
    );
    //Return
    return updatedClass;
  };

  deleteClass = async (userId, classId) => {
    //Parameter - user.role이 admin인지 검증하기
    await this.checkAdminRole(userId);

    // 클래스 존재 확인
    await this.getClassByClassId(classId);

    //레파지토리 계층에 클래스 삭제 요청
    return await this.classesRepository.deleteClass(classId);
  };
}
