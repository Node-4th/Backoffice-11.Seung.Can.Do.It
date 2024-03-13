export class ClassesService {
  constructor(classesRepository) {
    this.classesRepository = classesRepository;
  }

  /** 03.01 수정사항
   * createClass - Repository 계층에서 검증 로직 가져옴.
   * - 클래스 생성이력 확인
   * - 클래스 생성과 classId 업데이트를 분리
   *
   * updateClass - 클래스명 중복 확인 로직, 클래스 존재 여부 if문 추가.
   * deleteClass - 클래스 존재 여부 if문 추가
   */

  getClassByClassId = async (classId) => {
    const myClass = await this.classesRepository.getClassByClassId(classId);
    if (!myClass) throw new Error("존재하지 않는 클래스입니다.");
    return myClass;
  };

  //Admin 권한 체크 - 생성/수정/삭제에서 재사용
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

  createClass = async (userId, name) => {
    //클래스 생성이력 확인
    const checkAdminUser = await this.checkAdminRole(userId);
    if (checkAdminUser.classId !== null)
      throw new Error("이미 생성한 사용자입니다.");

    //클래스명 중복 확인
    const checkClassName = await this.classesRepository.getClassByName(name);
    if (checkClassName) throw new Error("이미 존재하는 클래스명입니다.");

    //클래스 생성
    const createdClass = await this.classesRepository.createClass(name);
    //Users 테이블의 classId를 업데이트
    await this.classesRepository.updateUsersClassId(userId, createdClass.id);

    return createdClass;
  };

  updateClass = async (userId, classId, name) => {
    await this.checkAdminRole(userId);

    //클래스 존재 확인
    await this.getClassByClassId(classId);
    if (!classId) throw new Error("존재하지 않는 클래스입니다.");

    //클래스명 중복 확인
    const checkClassName = await this.classesRepository.getClassByName(name);
    if (checkClassName) throw new Error("이미 존재하는 클래스명입니다.");

    //클래스 수정
    return await this.classesRepository.updateClass(classId, name);
  };

  deleteClass = async (userId, classId) => {
    await this.checkAdminRole(userId);

    //클래스 존재 확인
    await this.getClassByClassId(classId);
    if (!classId) throw new Error("존재하지 않는 클래스입니다.");

    //클래스 삭제
    return await this.classesRepository.deleteClass(classId);
  };
}
