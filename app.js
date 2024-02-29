import express from "express";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/error-handler.Middleware.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import schedule from "node-schedule";
import axios from "axios";

dotenv.config();
import methodOverride from "method-override";

/**라우터 모듈 마운트 */

import classRoter from "./src/routes/classes.routes.js";
import projectRouter from "./src/routes/projects.routes.js";
import teamsRouter from "./src/routes/teams.routes.js";
import feedbacksRouter from "./src/routes/feedbacks.routes.js";
import tasksRouter from "./src/routes/tasks.router.js";
import teamInfosRouter from "./src/routes/teamInfos.router.js";
import emailRouter from "./src/routes/emailservice.routes.js";
import usersRouter from "./src/routes/users.routes.js";
import notSumitUserRouter from "./src/routes/projects.routes.js";
import { prisma } from "./src/models/index.js";
import slackRouter from "./src/routes/slack.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/classes", classRoter);
app.use("/projects", projectRouter);
app.use("/teams", teamsRouter);
app.use("/feedbacks", feedbacksRouter);
app.use("/teamInfos", teamInfosRouter);
app.use("/send-emails", emailRouter);
app.use("/tasks", tasksRouter);
app.use("/slack", slackRouter);

// app.use("/projects", notSumitUserRouter);

app.use(errorHandlerMiddleware);

////////////////////////////////


app.get('/main', async (req, res, next) => {
  res.render('main.ejs');
});

app.get('/signup', async (req, res, next) => {
  res.render('signup.ejs');
});

app.get("/signin", async (req, res, next) => {
  res.render("signin.ejs");
});

// student
app.get("/students/main", async (req, res, next) => {
  res.render("student_main.ejs");
});

// ------------------------------------------------
app.get('/students/team_Infos/:teamId', async (req, res, next) => {
  const { teamId } = req.params;
  const team = await prisma.Teams.findFirst({where: {id: +teamId}});
  const teamInfos = await prisma.TeamInfos.findFirst({where: {teamId: +teamId}});
  res.render('student_teamInfos.ejs', { team: team, teamInfos: teamInfos });
}); 

app.get('/students/submit/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  const { teamId } = req.query;
  res.render('student_submit.ejs', { projectId, teamId });
});

app.get('/students/createteamInfo/:teamId', async (req, res, next) => {
  const { teamId } = req.params;
  res.render('student_teamInfos_create.ejs', {teamId: +teamId});
});

app.get("/students/til", async (req, res, next) => {
  res.render("student_til.ejs");
});

app.get("/students/personal_project", async (req, res, next) => {
  res.render("student_pp.ejs");
});

app.get("/students/submit", async (req, res, next) => {
  res.render("student_submit.ejs");
});

app.get("/students/createteamInfo", async (req, res, next) => {
  res.render("student_teamInfos_create.ejs");
});

app.get("/students/team", async (req, res, next) => {
  res.render("student_team.ejs");
});

app.get("/students/feedback", async (req, res, next) => {
  res.render("student_feedback.ejs");
});

// admin
app.get("/admins/main", async (req, res, next) => {
  res.render("admin_main.ejs");
});

app.get('/admins/task', async (req, res, next) => {
  res.render('admin_task.ejs');
});

app.get('/admin/createclass', async (req, res, next) => {
  res.render('admin_createclass.ejs');
});

app.get('/admin/createproject', async (req, res, next) => {
  res.render('admin_createproject.ejs');
});

app.get('/admin/createteam/:projectId', async (req, res, next) => {
  const {projectId} = req.params;
  res.render('admin_createteam.ejs', { projectId: projectId });
});

app.get('/admin/editteam/:teamId', async (req, res, next) => {
  const {teamId} = req.params;
  const team = await prisma.Teams.findFirst({where: {id: +teamId}});
  res.render('admin_editteam.ejs', { team: team });
});

// tutor
app.get('/tutor/main', async (req, res, next) => {
  res.render('tutor_main.ejs');
});

app.get('/tutor/createfeedback/:taskId', async (req, res, next) => {
  const { taskId } = req.params;
  res.render('tutor_createfeedback.ejs', {taskId});
});

app.get('/tutor/editfeedback/:feedbackId', async (req, res, next) => {
  const { feedbackId } = req.params;
  const feedback = await prisma.feedbacks.findFirst({where: {id: +feedbackId}})
  res.render('tutor_editfeedback.ejs', { feedback });
});

const rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = [9, 12, 21];
rule.minute = 0;
rule.tz = "Asia/Seoul";

// const job = schedule.scheduleJob(rule, async () => {
//   const response = await axios.post(
//     "http://localhost:3000/projects/submit/slack",
//     {
//       category: "PERSONAL_PROJECT",
//       start: "2024-02-02T15:00:00.000Z",
//       end: "2024-02-29T15:00:00.000Z",
//       classId: 1,
//     },
//   );
// });

////////////////////////////////
// const rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 5)];
// rule.hour = [9, 12, 21];
// rule.minute = 0;
// rule.tz = "Asia/Seoul";
// const job = schedule.scheduleJob(rule, async () => {
//   const response = await axios.post(
//     "http://localhost:3000/projects/submit/slack",
//     {
//       category: "PERSONAL_PROJECT",
//       start: "2024-02-02T15:00:00.000Z",
//       end: "2024-02-29T15:00:00.000Z",
//       classId: 1,
//     },
//   );
// });

app.listen(PORT, () => {
  console.log(PORT, "번 포트로 서버가 열렸어요! http://localhost:3000/");
});
