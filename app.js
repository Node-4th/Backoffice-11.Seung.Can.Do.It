import express from "express";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/errorhandler.Middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

/** 라우터 모듈 마운트 */
const router = express.Router();

app.use("/api", router);

router.get("/", (req, res) => {
  return res.json({ message: "안녕하세요.😄" });
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(
    PORT,
    "번 포트로 서버가 열렸어요! API 명세서: http://localhost:3000/",
  );
});

export default router;
