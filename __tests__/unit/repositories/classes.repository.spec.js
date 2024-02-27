import { ClassesRepository } from "../../../src/repositories/classes.repository.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Mocked data
import newClass from "../data/new-class.data.json";
import user from "../data/user.data.json";

/** Repository 테스트 케이스 작성 패턴
 * beforAll()
 * afterAll()
 * describe('Test Case 1')
 *  it
 *   Mocking - jest.spyOn().mockResolvedValue(sampleData)
 *   Call - 매개변수 정의, Prisma 메서드 호출
 *   expect(Mockfn) - matcher(Times/CalledWith/Equal)
 *   Restore - Mockfn.mockRestore()
 */
describe("ClassesRepository", () => {
  let classesRepository;
  beforeAll(() => {
    classesRepository = new ClassesRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("getClassByClassId", () => {
    it("classId 값으로 클래스를 검색하여 반환해야함.", async () => {
      // Mocking - Prisma findFirst 메서드
      const findFirstMock = jest
        .spyOn(classesRepository.prisma.class, "findFirst")
        .mockResolvedValue(newClass);

      // Call - 매개변수 정의, 메서드 호출
      const classId = 1; // newResume resumeId: 1
      const retrievedClass = await classesRepository.getClassByClassId(classId);

      // expect - matcher
      expect(findFirstMock).toHaveBeenCalledTimes(1);
      expect(findFirstMock).toHaveBeenCalledWith({
        where: {
          id: +classId,
        },
        select: {
          name: true,
        },
      });
      expect(retrievedClass).toEqual(newClass);

      // Restore
      findFirstMock.mockRestore();
    });
  });

  describe("getUserByUserId", () => {
    it("userId 값으로 클래스를 검색하여 반환해야함.", async () => {
      // Mocking - Prisma findFirst 메서드
      const findFirstMock = jest
        .spyOn(classesRepository.prisma.users, "findFirst")
        .mockResolvedValue(user);

      // Call - 매개변수 정의, 메서드 호출
      const userId = 1;
      const retrievedUser = await classesRepository.getUserByUserId(userId);

      // expect - matcher
      expect(findFirstMock).toHaveBeenCalledTimes(1);
      expect(findFirstMock).toHaveBeenCalledWith({
        where: {
          userId: userId,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   name: true,
        //   password: true,
        //   profileImage: true,
        //   role: true,
        //   classId: true,
        // },
      });
      expect(retrievedUser).toEqual(user);

      // Restore
      findFirstMock.mockRestore();
    });
  });

  describe("getClassByName", () => {
    it("name 값으로 클래스를 검색하여 반환해야함.", async () => {
      // Mocking - Prisma findFirst 메서드
      const findFirstMock = jest
        .spyOn(classesRepository.prisma.class, "findFirst")
        .mockResolvedValue(newClass);

      // Call - 매개변수 정의, 메서드 호출
      const name = "노드 4기 교육과정(수정)";
      const retrievedClass = await classesRepository.getClassByName(name);

      // expect - matcher
      expect(findFirstMock).toHaveBeenCalledTimes(1);
      expect(findFirstMock).toHaveBeenCalledWith({
        where: {
          name: name,
        },
      });
      expect(retrievedClass).toEqual(newClass);

      // Restore
      findFirstMock.mockRestore();
    });
  });

  describe("createClass", () => {
    it("name 매개변수를 전달 받아서 생성된 클래스를 반환해야함.", async () => {
      // Mocking - Prisma create 메서드
      const createMock = jest
        .spyOn(classesRepository.prisma.class, "create")
        .mockResolvedValue(newClass);

      // Call - 매개변수 정의, 메서드 호출
      const name = "노드 4기 교육과정(수정)";
      const createdClass = await classesRepository.createClass(name);

      // expect - matcher
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith({
        data: {
          name,
        },
      });
      expect(createdClass).toEqual(newClass);

      // Restore
      createMock.mockRestore();
    });
  });

  describe("updateClass", () => {
    it("classId, name 매개변수를 전달 받아서 수정된 클래스를 반환해야함.", async () => {
      // Mocking - Prisma create 메서드
      const updateMock = jest
        .spyOn(classesRepository.prisma.class, "update")
        .mockResolvedValue(newClass);

      // Call - 매개변수 정의, 메서드 호출
      const classId = 1;
      const name = "노드 4기 교육과정(수정)";
      const updatedClass = await classesRepository.updateClass(classId, name);

      // expect - matcher
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith({
        where: {
          id: +classId,
        },
        data: {
          name,
        },
      });

      expect(updatedClass).toEqual(newClass);

      // Restore
      updateMock.mockRestore();
    });
  });

  describe("deleteClass", () => {
    it("classId 값으로 삭제한 이력서를 반환해야함.", async () => {
      // Mocking - Prisma delete 메서드
      const deleteMock = jest
        .spyOn(classesRepository.prisma.class, "delete")
        .mockResolvedValue(newClass);

      // Call - 매개변수 정의, 메서드 호출
      const classId = 4;
      const deletedClass = await classesRepository.deleteClass(classId);

      // expect - matcher
      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(deleteMock).toHaveBeenCalledWith({
        where: {
          id: +classId,
        },
      });
      expect(deletedClass).toEqual(newClass);

      // Restore
      deleteMock.mockRestore();
    });
  });
});
