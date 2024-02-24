import express from "express";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/error-handler.Middleware.js";
import dotenv from "dotenv";
dotenv.config();

/**라우터 모듈 마운트 */

import ClassRoter from "./src/routes/classes.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/classes", ClassRoter);

// router.get("/", (req, res) => {
//   return res.json({ message: "안녕하세요.😄" });
// });

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "번 포트로 서버가 열렸어요! http://localhost:3000/");
});
