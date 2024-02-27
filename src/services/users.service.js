import bcrypt from "bcrypt";

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  signUpUser = async (name, email, password, pwConfirm, profileImg, role) => {
    if (!name || !email || !password || !pwConfirm || !role) {
      throw new Error("필수항목을 체크해주세요");
    }
    if (password !== pwConfirm) {
      throw new Error("비밀번호가 비밀번호 확인과 다릅니다.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
      profileImg,
      role,
    });
    if (!user) {
      throw new Error("회원가입에 실패했습니다.");
    }
    return { user: { name, email, profileImg, role } };
  };

  signInUser = async (email, password) => {
    if (!email || !password) {
      throw new Error("필수 항목을 체크해주세요");
    }
    const user = await this.usersRepository.findUniqueUser(email);
    if (!user) throw new Error("로그인 정보가 틀립니다.");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("비밀번호가 다릅니다.");

    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        classId: user.classId,
        profileImage: user.profileImage,
        role: user.role,
      },
    };
  };
}
