import express from "express";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/error-handler.Middleware.js";
import dotenv from "dotenv";
dotenv.config();

/**라우터 모듈 마운트 */

import classRoter from "./src/routes/classes.routes.js";
import projectRouter from "./src/routes/projects.routes.js";
import teamsRouter from "./src/routes/teams.routes.js";
import feedbacksRouter from "./src/routes/feedbacks.routes.js";
import tasksRouter from "./src/routes/tasks.router.js";
import teamInfosRouter from "./src/routes/teamInfos.router.js";
import eamilRouter from "./src/routes/emailservice.routes.js";
import usersRouter from "./src/routes/users.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/classes", classRoter);
app.use("/projects", projectRouter);
app.use("/teams", teamsRouter);
app.use("/feedbacks", feedbacksRouter);
app.use("/teamInfos", teamInfosRouter);
app.use("/api", eamilRouter);
app.use("/tasks", tasksRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "번 포트로 서버가 열렸어요! http://localhost:3000/");
});
