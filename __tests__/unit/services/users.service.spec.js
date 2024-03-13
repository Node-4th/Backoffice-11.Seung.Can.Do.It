import { jest } from "@jest/globals";
import { UsersService } from "../../../src/services/users.service";

let mockusersRepository = {
  createUser: jest.fn(),
  findUniqueUser: jest.fn(),
};

let usersService = new UsersService(mockusersRepository);

describe("users service unit test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("signUpUser Method", async () => {
    const params = {
      name: "이름",
      email: "이메일",
      password: "123456",
      pwConfirm: "123456",
      profileImg: null,
      role: "admin",
    };

    const result = {
      id: 1,
      classId: null,
      name: "이름",
      email: "이메일",
      password: "$2b$10$JUdmCI4ZisaYdIMb4Gc7tubkfZZOTw8dGNcyahNArySGAl7gkGIby",
      profileImg: null,
      role: "ADMIN",
    };

    mockusersRepository.createUser.mockReturnValue(result);

    await expect(async () => {
      await usersService.signUpUser();
    }).rejects.toThrow("필수항목을 체크해주세요");

    await expect(async () => {
      await usersService.signUpUser(
        params.name,
        params.email,
        params.password,
        params.pwConfirm + "a",
        params.profileImg,
        params.role,
      );
    }).rejects.toThrow("비밀번호가 비밀번호 확인과 다릅니다.");

    const createUser = await usersService.signUpUser(
      params.name,
      params.email,
      params.password,
      params.pwConfirm,
      params.profileImg,
      params.role,
    );

    expect(mockusersRepository.createUser).toHaveBeenCalledTimes(1);

    expect(createUser).toEqual({
      user: {
        name: result.name,
        email: result.email,
        profileImg: result.profileImg,
        role: result.role,
      },
    });
  });

  test("signInUser Method", async () => {
    const params = {
      email: "이메일",
      password: "비밀번호",
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
    // expect.any(String)
    mockusersRepository.findUniqueUser.mockReturnValue(result);

    await expect(async () => {
      await usersService.signInUser();
    }).rejects.toThrow("필수 항목을 체크해주세요");

    await expect(async () => {
      await usersService.signInUser(params.email, params.password);
    }).rejects.toThrow("비밀번호가 다릅니다.");

    expect(mockusersRepository.findUniqueUser).toHaveBeenCalledTimes(1);
    expect(mockusersRepository.findUniqueUser).toHaveBeenCalledWith(
      params.email,
    );
  });
});
