export class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }
  submitTask = async (req, res, next) => {
    try {
      const projectId = req.params.projectId;

      const user = req.user;
      const { content, submitUrl } = req.body;
      if (!content || !submitUrl) throw new Error("필수값을 입력해주세요.");
      const teamId = req.query.teamId;

      const project = await this.tasksService.submitTask(
        projectId,
        user.id,
        teamId,
        content,
        submitUrl,
      );
      console.log(project);

      if (teamId) {
        res.redirect(`/students/team_Infos/${teamId}`);
      } else {
        res.render("student_pp.ejs", { project });
      }
    } catch (err) {
      next(err);
    }
  };

  findTaskCategory = async (req, res, next) => {
    try {
      const category = req.query.category;

      if (!["TIL", "PERSONAL_PROJECT", "TEAM_PROJECT"].includes(category))
        throw new Error("올바르지 않는 카테고리 입니다.");
      const findTaskCategory =
        await this.tasksService.findTaskCategory(category);
      // return res.status(200).json({
      //   success: true,
      //   message: "성공적으로 조회하였습니다.",
      //   findTaskCategory,
      // });
      // console.log('=========',findTaskCategory);
      // return res.redirect('tutor_pp.ejs',{findTaskCategory:findTaskCategory})
    } catch (err) {
      next(err);
    }
  };

  findTask = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      const findTask = await this.tasksService.findTask(taskId);
      // return res.status(201).json({
      //   success: true,
      //   message: "성공적으로 조회하였습니다.",
      //   findTask,
      // });
      return res.render("tutor_task.ejs", { task: findTask });
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      const user = req.user;
      const teamId = req.query.teamId;
      const findTask = await this.tasksService.findTask(taskId);
      const { content, submitUrl } = req.body;
      if (!content || !submitUrl) throw new Error("필수값을 입력해주세요.");
      const updateTask = await this.tasksService.updateTask(
        taskId,
        user.id,
        findTask.userId,
        teamId,
        findTask.teamId,
        content,
        submitUrl,
      );
      return res.status(201).json({
        success: true,
        message: "성공적으로 수정하였습니다.",
        updateTask,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      const user = req.user;
      const teamId = req.query.teamId;
      const findTask = await this.tasksService.findTask(taskId);
      await this.tasksService.deleteTask(
        taskId,
        user.id,
        teamId,
        user.role,
        findTask.userId,
        findTask.teamId,
      );
      return res
        .status(200)
        .json({ success: "true", message: "성공적으로 삭제했습니다." });
    } catch (err) {
      next(err);
    }
  };

  findTasksByProject = async (req, res, next) => {
    try {
      const { projectId } = req.params;

      const tasks = await this.tasksService.findTasksByProject(projectId);

      return res.render("tutor_tasks.ejs", { tasks });
    } catch (err) {
      next(err);
    }
  };
}
