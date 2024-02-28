import { jest } from "@jest/globals";
import { UsersController } from "../../../src/controllers/users.controller";

const mockUsersService = {
  signUpUser: jest.fn(),
  signInUser: jest.fn(),
};

const mockReq = {
  body: jest.fn(),
  query: jest.fn(),
  params: jest.fn(),
};

const mockRes = { status: jest.fn(), json: jest.fn() };
const mockNext = jest.fn();

const usersController = new UsersController(mockUsersService);

describe("users controller unit test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockRes.status.mockReturnValue(mockRes);
  });

  test("signUp method", async () => {
    const params = {
      name: "이름",
      email: "이메일",
      password: "비밀번호",
      pwConfirm: "비밀번호",
      profileImg: null,
    };

    const query = {
      role: "ADMIN",
    };

    const result = {
      user: {
        name: params.name,
        email: params.email,
        profileImg: params.profileImg,
        role: params.role,
      },
    };

    mockReq.body = params;
    mockReq.query = query;

    mockUsersService.signUpUser.mockReturnValue(result);

    await usersController.signUp(mockReq, mockRes, mockNext);

    expect(mockUsersService.signUpUser).toHaveBeenCalledWith(
      params.name,
      params.email,
      params.password,
      params.pwConfirm,
      params.profileImg,
      query.role,
    );
    expect(mockUsersService.signUpUser).toHaveBeenCalledTimes(1);

    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(201);

    expect(mockRes.json).toHaveBeenCalledWith({
      message: "회원가입 완료되었습니다.",
      success: true,
      user: result,
    });
  });

  test("signIn method", async () => {
    const params = {
      email: "이메일",
      password: "비밀번호",
    };

    const result = {
      data: {
        id: 1,
        name: "이름",
        email: params.email,
        classId: null,
        profileImage: null,
        role: "ADMIN",
      },
    };

    mockReq.body = params;

    mockUsersService.signInUser.mockReturnValue(result);

    await usersController.signIn(mockReq, mockRes, mockNext);

    expect(mockUsersService.signInUser).toHaveBeenCalledWith(
      params.email,
      params.password,
    );
    expect(mockUsersService.signInUser).toHaveBeenCalledTimes(1);

    // expect(mockRes.status).toHaveBeenCalledTimes(1);
    // expect(mockRes.status).toHaveBeenCalledWith(200);

    // expect(mockRes.json).toHaveBeenCalledWith({
    //   message: "로그인되었습니다.",
    //   success: true,
    //   user: result,
    // });
  });
});
