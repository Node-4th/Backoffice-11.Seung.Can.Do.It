export class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }
  submitTask = async (req, res, next) => {
    try {
      const projectId = req.params.projectId;
      const user = req.user;
      const { content, submitUrl } = req.body;
      if (!content || !submitUrl)
        return res
          .status(400)
          .json({ success: false, message: "필수값을 입력해주세요." });
      const teamId = req.query.teamId;
      const submitTask = await this.tasksService.submitTask(
        projectId,
        user.userId,
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

  // findTaskCategory = async (req, res, next) => {
  //   try {
  //     const category = req.query.category;
  //     if ((![TIL, PERSONAL_PROJECT, TEAM_PROJECT], includes(category)))
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "올바르지 않는 카테고리 입니다." });
  //     const findTaskCategory =
  //       await this.tasksService.findTaskCategory(category);
  //     return res.status(200).json({
  //       success: true,
  //       message: "성공적으로 조회하였습니다.",
  //       findTaskCategory,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  findTask = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;

      const findTask = await this.tasksService.findTask(taskId);
      return res.status(201).json({
        success: true,
        message: "성공적으로 조회하였습니다.",
        findTask,
      });
    } catch (err) {
      next(err);
    }
  };

  // editTask = async (req, res, next) => {
  //   try {
  //     const taskId = req.params.taskId;

  //     const editTask = await this.tasksService.editTask(
  //       taskId,
  //       content,
  //       submitUrl,

  //       );
  // return res.status(201).json({
  //   success: true,
  //   message: "성공적으로 조회하였습니다.",
  //   editTask,
  // });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  deleteTask = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      const user = req.user;
      console.log(user);

      const findTask = await this.tasksService.findTask(taskId);

      const deleteTask = await this.tasksService.deleteTask(
        taskId,
        user.id,
        findTask.userId,
      );
      return res.status(204).json({
        success: true,
        message: "성공적으로 삭제하였습니다.",
      });
    } catch (err) {
      next(err);
    }
  };
}
