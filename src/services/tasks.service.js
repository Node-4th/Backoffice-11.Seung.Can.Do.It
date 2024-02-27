export class TasksService {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  submitTask = async (projectId, userId, teamId, content, submitUrl) => {
    const project = await this.tasksRepository.findProjectById(projectId);
    if (!project) {
      throw new Error("프로젝트 조회에 실패하였습니다.");
    }
    if (teamId === undefined) {
      const submitTask = await this.tasksRepository.submitTask({
        projectId: +projectId,
        userId,
        content,
        submitUrl,
      });
      return submitTask;
    } else {
      const team = await this.tasksRepository.findTeamById(teamId);
      if (!team) {
        throw new Error("팀 조회에 실패하였습니다.");
      }
      const submitTask = await this.tasksRepository.submitTask({
        projectId: +projectId,
        teamId: +teamId,
        content,
        submitUrl,
      });
      return submitTask;
    }
  };

  findTaskCategory = async (category) => {
    const projects = await this.tasksRepository.findProjectByCategory(category);
    const findTaskByProjectId = await this.tasksRepository.findTaskByProjectId(
      projects.id,
    );
    return findTaskByProjectId;
  };

  findTask = async (taskId) => {
    const task = await this.tasksRepository.findTask(taskId);
    if (!task) {
      throw new Error("과제 조회에 실패하였습니다.");
    }
    return task;
  };

  updateTask = async (taskId, userId, taskUserId, content, submitUrl) => {
    if (userId !== taskUserId) {
      throw new Error("과제를 삭제할 권한이 없습니다.");
    }

    const updateTask = await this.tasksRepository.updateTask(
      taskId,
      userId,
      content,
      submitUrl,
    );

    return updateTask;
  };

  deleteTask = async (taskId, userId, taskUserId) => {
    if (userId !== taskUserId) {
      throw new Error("과제를 삭제할 권한이 없습니다.");
    }

    const task = await this.tasksRepository.deleteTask(taskId, userId);

    return task;
  };
}
