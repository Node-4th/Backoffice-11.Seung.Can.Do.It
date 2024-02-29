import express from "express";
import slackSender from "../utils/slackSender.js";

/**PrismaORM -> 3계층 의존성 주입 */
import { prisma } from "../models/index.js";
import { ProjectsRepository } from "../repositories/projects.repository.js";
import { ProjectsService } from "../services/projects.service.js";
import { ProjectsController } from "../controllers/projects.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import slackSender from "../utils/slackSender.js";

const router = express.Router();

/**인스턴스 생성 */
const projectsRepository = new ProjectsRepository(prisma);
const projectsService = new ProjectsService(projectsRepository);
const projectsController = new ProjectsController(projectsService);

// 프로젝트 미제출자 목록 조회
router.get("/submit", authMiddleware, projectsController.getAllNotSubmitUser);

// 프로젝트 생성, 조회, 수정, 삭제
router.get("/", authMiddleware, projectsController.getAllProjects);
router.get(
  "/:projectId",
  authMiddleware,
  projectsController.getProjectByProjectId,
);
router.post("/", authMiddleware, projectsController.createProject);
router.put("/:projectId", authMiddleware, projectsController.updateProject);
router.delete("/:projectId", authMiddleware, projectsController.deleteProject);
<<<<<<< HEAD
router.post("/submit/slack", async (req, res, next) => {
  try {
    const { category, start, end, classId } = req.body;

=======

// router.post(
//   "/submit/slack",
//   authMiddleware,
//   projectsController.notSubmitUserSendSlack,
//   async (req, res, next) => {
//     try {
//       const text = req.notSubmitUsers;
//       let nameArr = text.map((item) => item.name);
//       let resultString = nameArr.join(", ");
//       console.log("resultString: ", resultString);
//       await slackSender(resultString);
//       return res.status(200).json({ message: "슬랙으로 메세지 발송완료" });
//     } catch (error) {
//       next(error);
//     }
//   },
// );

router.post("/submit/slack", async (req, res, next) => {
  try {
    const { category, start, end, classId } = req.body;
>>>>>>> 65d6b810a736f3834874d10739ddee0a4678c8bd
    const notSubmitUsers = await projectsRepository.getAllNotSubmitUser(
      category,
      start,
      end,
      classId,
    );
<<<<<<< HEAD

=======
>>>>>>> 65d6b810a736f3834874d10739ddee0a4678c8bd
    const text = notSubmitUsers;
    let nameArr = text.map((item) => item.name);
    let resultString = nameArr.join(", ");
    await slackSender(resultString);
<<<<<<< HEAD

=======
>>>>>>> 65d6b810a736f3834874d10739ddee0a4678c8bd
    return res.status(200).json({ message: "슬랙으로 메세지 발송완료" });
  } catch (error) {
    next(error);
  }
});

export default router;
