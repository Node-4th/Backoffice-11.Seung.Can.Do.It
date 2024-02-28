import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createAccessToken(id) {
  try {
    const accessToken = jwt.sign({ id }, process.env.CUSTOM_SECRET_KEY, {
      expiresIn: "1d",
    });
    return accessToken;
  } catch (error) {
    throw new Error("토큰 생성 에러." + error.message);
  }
}

export function createVerifyToken(email) {
  try {
    const verifyToken = jwt.sign({ email }, process.env.CUSTOM_SECRET_KEY, {
      expiresIn: "1d", //5m
    });
    return verifyToken;
  } catch (error) {
    throw new Error("토큰 생성 에러." + error.message);
  }
}

export function createRefreshToken(id) {
  return jwt.sign({ id }, process.env.CUSTOM_SECRET_KEY, {
    expiresIn: "12d",
  });
}
