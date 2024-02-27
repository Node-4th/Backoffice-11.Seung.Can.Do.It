import { ClassesService } from "../../../src/services/classes.service.js";

// Mocked data
import newClass from "../data/new-class.data.json";
import userData from "../data/user1.data.json";

/** Service 테스트 케이스 작성 패턴
 * beforeEach() 
    - 모킹한 Repository 메서드를 jest.fn()로 대체
    - Service 인스턴스 생성
 * afterEach()
    - 각 테스트 종료시 모킹 초기화
 * describe('Test Case 1')
 * ㄴ it('테스트')
 *   Mocking - jest.fn()로 모킹한 Repository 메서드 정의
 *   Call - 매개변수 정의, Repository 메서드 호출
 *   expect(Mockfn) - matcher(Times/CalledWith/Equal)
 * ㄴ it('에러 처리')
 *   Mocking, Call은 동일
 *   expect(rejectedPromise).rejects.toThrow('errorMessage')
*/

describe("ClassesService", () => {
  let classesService;
  let repoMocks;

  beforeEach(() => {
    repoMocks = {
      checkAdminRole: jest.fn(),
      getClassByClassId: jest.fn(),
      getUserByUserId: jest.fn(),
      getClassByName: jest.fn(),
      createClass: jest.fn(),
      updateClass: jest.fn(),
      deleteClass: jest.fn(),
    };
    classesService = new ClassesService(repoMocks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("checkAdminRole", () => {
    it("userId 값으로 조회한 사용자가 존재하지 않으면, 에러 메세지를 반환해야함.", async () => {
      repoMocks.getUserByUserId.mockResolvedValue(null);

      const userId = 123;

      await expect(classesService.checkAdminRole(userId)).rejects.toThrowError(
        "존재하지 않는 사용자입니다.",
      );
    });

    it("userId 값으로 조회한 사용자의 역할(role)이 ADMIN이 아니면, 에러 메세지를 반환해야함.", async () => {
      repoMocks.getUserByUserId.mockResolvedValue({ role: "STUDENT" });

      const userId = 123;

      await expect(classesService.checkAdminRole(userId)).rejects.toThrowError(
        "관리자에게만 허용된 권한입니다.",
      );
    });

    it("userId 값으로 조회한 사용자의 역할(role)이 ADMIN이면, 에러 메세지를 반환하지 않아야함.", async () => {
      repoMocks.getUserByUserId.mockResolvedValue({ role: "ADMIN" });

      const userId = 123;

      await expect(classesService.checkAdminRole(userId)).resolves.toBeTruthy();
    });
  });

  describe("getClassByClassId", () => {
    it("classId 값으로 클래스를 검색하여 반환해야함.", async () => {
      // Mocking - Repo. Method
      const classId = 1;
      repoMocks.getClassByClassId.mockResolvedValue(newClass);

      // Call - Repository 메서드 호출
      const retrievedClass = await classesService.getClassByClassId(classId);

      // expect - matcher
      expect(repoMocks.getClassByClassId).toHaveBeenCalledTimes(1);
      expect(repoMocks.getClassByClassId).toHaveBeenCalledWith(classId);
      expect(retrievedClass).toEqual(newClass);
    });

    it("classId 값의 클래스가 존재하지 않으면, 에러 메세지를 반환해야함.", async () => {
      // Mocking - Repo. Method
      repoMocks.getClassByClassId.mockRejectedValue(
        new Error("존재하지 않는 클래스입니다."),
      );

      // Call - Repository 메서드 호출
      const IsNotExistClassId = 100;
      const rejectedPromise =
        classesService.getClassByClassId(IsNotExistClassId);

      // expect - matcher
      await expect(rejectedPromise).rejects.toThrow(
        "존재하지 않는 클래스입니다.",
      );
    });
  });

  describe("createClass", () => {
    it("checkAdminrole을 호출하여 접근한 사용자가 ADMIN이 아니면 에러 메세지를 반환해야함.", async () => {
      repoMocks.getUserByUserId.mockResolvedValue({ role: "STUDENT" });

      const userId = 5;
      await expect(classesService.checkAdminRole(userId)).rejects.toThrowError(
        "관리자에게만 허용된 권한입니다.",
      );
    });

    // 클래스명 중복 확인
    it("getClassByName을 호출하여 중복된 클래스명으로 생성하려고 한다면, 에러 메세지를 반환해야함.", async () => {
      repoMocks.getClassByName.mockResolvedValue({
        id: 1,
        name: "노드 4기",
      });
      repoMocks.checkAdminRole.mockResolvedValue(userData);
      await expect(
        classesService.createClass(1, "노드 4기"),
      ).rejects.toThrowError("이미 존재하는 클래스명입니다.");
    });
  });
});
