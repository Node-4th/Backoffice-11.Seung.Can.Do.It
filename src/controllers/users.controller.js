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
      const adminId = req.query.adminId;

      const user = await this.usersService.signUpUser(
        name,
        email,
        password,
        pwConfirm,
        profileImg,
        role,
        adminId
      );

      // return res
        // .status(201)
        // .json({ message: "회원가입 완료되었습니다.", success: true, user });
      return res.status(201).redirect('/signin').json({ message: "회원가입 완료되었습니다.", success: true, user });
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

      // return res
      //   .status(200)
      //   .json({ message: "로그인되었습니다.", success: true, user });
      switch (user.role) {
        case 'ADMIN':
          res.render('admin_main.ejs');
          break;
        case 'TUTOR':
          res.render('tutor_main.ejs');
          break;
        case 'STUDENT':
          res.render('student_main.ejs');
          break;
      }
    } catch (error) {
      next(error);
    }
  };
}
