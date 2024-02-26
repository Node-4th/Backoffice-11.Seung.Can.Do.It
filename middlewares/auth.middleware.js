import jwt from "jsonwebtoken";
import { prisma } from "../src/models/index.js";
import dotenv from "dotenv";

dotenv.config();

export default async function (req, res, next) {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) throw new Error("토큰이 없습니다.");

    const [tokenType, token] = accessToken.split(" ");
    if (tokenType !== "Bearer") throw new Error("토큰 타입이 틀립니다.");

    const decodedToken = jwt.verify(token, process.env.CUSTOM_SECRET_KEY);
    const userId = decodedToken.id;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });

    if (!user) throw new Error("토큰 사용자 없음!");

    req.user = user;

    if (decodedToken.exp * 1000 < Date.now()) {
      if (refreshToken) {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.CUSTOM_SECRET_KEY,
        );

        if (decodedRefreshToken.exp * 1000 > Date.now()) {
          const newAccessToken = createAccessToken(userId);
          res.cookie("accessToken", `Bearer ${newAccessToken}`);
        } else {
          return res
            .status(401)
            .json({ message: "리프레시 토큰이 만료되었습니다." });
        }
      } else {
        return res.status(401).json({ message: "리프레시 토큰이 없습니다." });
      }
    }
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ message: "토큰이 조작되었습니다." });
    return res.status(400).json({ message: error.message });
  }
}
