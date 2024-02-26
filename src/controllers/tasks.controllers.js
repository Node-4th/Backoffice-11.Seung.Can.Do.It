import { tasksService } from "../services/tasks.service.js";

export class TasksController {
  tasksService = new tasksService();
  submitTask = async (req, res, next) => {
    try {
      const projectId = req.params.projectId;
      // const user = res.locals.user;
      const { content, submitUrl, userId } = req.body;
      if (!content || !submitUrl)
        return res
          .status(400)
          .json({ success: false, message: "필수값을 입력해주세요." });
      const teamId = req.query.teamId;
      const submitTask = await this.tasksService.submitTask(
        projectId,
        userId,
        //user.userId,
        teamId,
        content,
        submitUrl,
      );
      return res.status(201).json({
        success: true,
        message: "성공적으로 제출하였습니다.",
        submitTask,
      });
    } catch (err) {
      next(err);
    }
  };
}
