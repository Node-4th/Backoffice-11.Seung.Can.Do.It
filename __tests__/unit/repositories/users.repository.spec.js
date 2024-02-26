import { jest } from "@jest/globals";
import { UsersRepository } from "../../../src/repositories/users.repository";

let mockPrisma = {
  users: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

let usersRepository = new UsersRepository(mockPrisma);

describe("users repository unit test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("createUser Method", async () => {
    const params = {
      name: "이름",
      email: "이메일",
      password: "해쉬된 비밀번호",
      profileImg: null,
      role: "admin",
    };

    const result = {
      id: 1,
      classId: null,
      name: "이름",
      email: "이메일",
      password: "해쉬된 비밀번호",
      profileImg: null,
      role: "admin",
    };

    mockPrisma.users.create.mockReturnValue(result);

    const createUsersData = await usersRepository.createUser(params);

    expect(createUsersData).toBe(result);

    expect(mockPrisma.users.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.users.create).toHaveBeenCalledWith({ data: params });
  });

  test("findUniqueUser Method", async () => {
    const params = {
      email: "이메일",
    };

    const result = {
      id: 1,
      classId: null,
      email: "이메일",
      password: "해쉬된 비밀번호",
      name: "이름",
      profileImage: null,
      role: "ADMIN",
    };

    mockPrisma.users.findUnique.mockReturnValue(result);

    const signInUsersData = await usersRepository.findUniqueUser(params);

    expect(signInUsersData).toBe(result);

    expect(mockPrisma.users.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
      where: { email: params },
    });
  });
});
