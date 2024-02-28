export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser = async ({ name, email, password, profileImg, role, adminId }) => {
    let createUser;
    if (adminId) {
      const classId = await this.prisma.users.findFirst({
        where: { id: +adminId },
        select: { classId: true },
      });
      createUser = await this.prisma.users.create({
        data: {
          name,
          email,
          password,
          profileImg,
          role,
          classId: classId.classId,
        },
      });
    } else {
      createUser = await this.prisma.users.create({
        data: {
          name,
          email,
          password,
          profileImg,
          role,
        },
      });
    }

    return createUser;
  };

  findUniqueUser = async (email) => {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    return user;
  };
}
