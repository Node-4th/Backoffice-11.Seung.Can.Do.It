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
      return project;
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
      return project;
    }
  };

  findTaskCategory = async (category) => {
    const projects = await this.tasksRepository.findProjectByCategory(category);
    if (!projects || projects.length === 0) {
      throw new Error("해당 카테고리의 프로젝트가 존재하지 않습니다.");
    }
    const projectIds = projects.map((project) => project.id);

    const findTaskByProjectId = await Promise.all(
      projectIds.map(async (projectId) => {
        const tasks = await this.tasksRepository.findTaskByProjectId(projectId);

        return tasks;
      }),
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

  updateTask = async (
    taskId,
    userId,
    taskUserId,
    teamId,
    taskTeamId,
    content,
    submitUrl,
  ) => {
    if (teamId === undefined) {
      if (userId !== taskUserId) {
        throw new Error("과제를 수정할 권한이 없습니다.");
      }
      const updateTask = await this.tasksRepository.updateTask(
        taskId,
        userId,
        content,
        submitUrl,
      );
      return updateTask;
    } else {
      if (+teamId !== taskTeamId) {
        throw new Error("과제를 수정할 권한이 없습니다.");
      }
      const updateTask = await this.tasksRepository.updateTeamTask(
        taskId,
        teamId,
        content,
        submitUrl,
      );
      return updateTask;
    }
  };

  deleteTask = async (
    taskId,
    userId,
    teamId,
    userRole,
    taskUserId,
    taskTeamId,
  ) => {
    if (userRole !== "ADMIN") {
      if (teamId === undefined) {
        if (userId !== taskUserId) {
          throw new Error("과제를 삭제할 권한이 없습니다.");
        }
      } else {
        if (+teamId !== taskTeamId) {
          throw new Error("과제를 삭제할 권한이 없습니다.");
        }
      }
    }

    const task = await this.tasksRepository.deleteTask(taskId);

    return task;
  };

  findTasksByProject = async (projectId) => {
    if(!projectId) {
      throw new Error('프로젝트를 선택하세요.');
    }

    const tasks = await this.tasksRepository.findTaskByProjectId(projectId);

    if(!tasks || !tasks.length === 0) {
      throw new Error('과제를 제출한 사람이 없습니다.');
    }
    console.log(tasks);

    return tasks;
  }
}
