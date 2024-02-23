import { PrismaClient } from "@prisma/client.js";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],

  errorFormat: "pretty",
});
prisma
  .$connect()
  .then(() => {
    console.log("Prisma 연결 완료");
  })
  .catch((err) => {
    console.log(err);
  });

export default prisma;
