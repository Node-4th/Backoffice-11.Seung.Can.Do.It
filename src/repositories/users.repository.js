export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser = async ({ name, email, password, profileImg, role }) => {
    const user = await this.prisma.users.create({
      data: {
        name,
        email,
        password,
        profileImg,
        role,
      },
    });
    return user;
  };

  findUniqueUser = async (email) => {
    const user = await this.prisma.users.findFirst({
      where: { email: email }
    });

    return user;
  };
}
