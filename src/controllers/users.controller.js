import { createAccessToken, createRefreshToken } from "../utils/token.js";

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  //회원 가입

  signUp = async (req, res, next) => {
    try {
      const { name, email, password, pwConfirm, profileImg } = req.body;
      const role = req.query.role ?? "ADMIN";

      const user = await this.usersService.signUpUser(
        name,
        email,
        password,
        pwConfirm,
        profileImg,
        role,
      );

      return res
        .status(201)
        .json({ message: "회원가입 완료되었습니다.", success: true, user });
    } catch (error) {
      next(error);
    }
  };

  //로그인

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.usersService.signInUser(email, password);
      const accessToken = createAccessToken(user.userId);
      const refreshToken = createRefreshToken(user.userId);

      res.cookie("accessToken", `Bearer ${accessToken}`);
      res.cookie("refreshToken", `Bearer ${refreshToken}`);

      return res
        .status(200)
        .json({ message: "로그인되었습니다.", success: true, user });
    } catch (error) {
      next(error);
    }
  };
}
