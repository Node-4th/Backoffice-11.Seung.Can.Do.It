import { describe, jest } from "@jest/globals";
import { UsersService } from "../../../src/services/users.service";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

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
      password: "비밀번호",
      pwConfirm: "비밀번호",
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

    const hashedPassword = "해쉬된 비밀번호";

    mockusersRepository.createUser.mockReturnValue(result);

    bcrypt.hash.mockReturnValue(hashedPassword);

    await expect(async () => {
      await usersService.signUpUser({});
    }).rejects.toThrow("필수항목을 체크해주세요");

    const createUser = await usersService.signUpUser(params);

    expect(mockusersRepository.createUser).toHaveBeenCalledTimes(1);
    expect(mockusersRepository.createUser).toHaveBeenCalledWith({
      name: "이름",
      email: "이메일",
      password: hashedPassword,
      profileImg: null,
      role: "admin",
    });

    expect(createUser).toEqual({
      user: {
        name: result.name,
        email: result.email,
        profileImg: result.profileImg,
        role: result.role,
      },
    });
  });
});
