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

  getClassByClassId = async (classId) => {
    const myClass = await this.classesRepository.getClassByClassId(classId);
    if (!classId) throw new Error("존재하지 않는 클래스입니다.");
    return myClass;
  };

  createClass = async (user, name) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(user);
    if (!isAdmin) {
      throw new Error("관리자만 클래스를 생성할 수 있습니다.");
    }
    // 클래스명 중복 확인
    const isExistClassByUser = await this.classesRepository.getUserByUserId(
      user.userId,
    );
    if (isExistClassByUser) {
      throw new Error("이미 클래스를 생성한 사용자입니다.");
    }
    // 클래스명 중복 확인
    const isExistClassByName =
      await this.classesRepository.getClassByName(name);
    if (isExistClassByName) {
      throw new Error("이미 존재하는 클래스명입니다.");
    }
    //레파지토리 계층에 클래스 생성 요청
    const createdClass = await this.classesRepository.createClass(name);

    // 클래스 생성 로그 기록
    // console.log(
    //   `${user.userId}번 관리자가 "${createdClass.name}" 클래스를 생성하였습니다.`,
    // );

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
    const isExistClassByClassId =
      await this.classesRepository.getClassByClassId(classId);
    if (!isExistClassByClassId) {
      throw new Error("수정할 클래스가 존재하지 않습니다.");
    }
    //레파지토리 계층에 클래스 수정 요청
    const updatedClass = await this.classesRepository.updateClass(
      classId,
      name,
    );

    // 클래스 수정 로그 기록
    // console.log(
    //   `${user.userId}번 관리자가 "${isExistClassByClassId.name}"에서 "${updatedClass.name}"으로 클래스명을 수정하였습니다.`,
    // );

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
    const isExistClassByClassId =
      await this.classesRepository.getClassByClassId(classId);
    if (!isExistClassByClassId) {
      throw new Error("삭제할 클래스가 존재하지 않습니다.");
    }
    //레파지토리 계층에 클래스 삭제 요청
    return await this.classesRepository.deleteClass(classId);

    // 클래스 삭제 로그 기록
    // console.log(
    //   `${user.userId}번 관리자가 "${isExistClassByClassId.name}" 클래스를 삭제하였습니다.`,
    // );
  };
}
