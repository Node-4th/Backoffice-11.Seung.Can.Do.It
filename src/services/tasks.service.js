export class TasksService {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  submitTask = async (projectId, userId, teamId, content, submitUrl) => {
    const project = await this.tasksRepository.findProjectById(projectId);
    if (!project) {
      throw {
        code: 400,
        message: "프로젝트 조회에 실패하였습니다.",
      };
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
        throw {
          code: 400,
          success: false,
          message: "팀 조회에 실패하였습니다.",
        };
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

  // findTaskCategory = async(category) {
  //   const project = await this.tasksRepository.findProjectByCategory(category);

  // }

  findTask = async (taskId) => {
    const task = await this.tasksRepository.findTask(taskId);
    if (!task) {
      throw {
        code: 400,
        success: false,
        message: "과제 조회에 실패하였습니다.",
      };
    }
    return task;
  };

  // editTask = async(taskId) => {

  // }

  deleteTask = async (taskId, userId, taskUserId) => {
    if (userId !== taskUserId) {
      throw {
        code: 400,
        success: false,
        message: "과제를 삭제할 권한이 없습니다.",
      };
    }

    const task = await this.tasksRepository.deleteTask(taskId, userId);

    return task;
  };
}
