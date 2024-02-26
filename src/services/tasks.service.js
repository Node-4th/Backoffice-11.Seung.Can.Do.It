import { TasksRepository } from "../repositories/tasks.repository.js";

export class tasksService {
  tasksRepository = new TasksRepository();
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
}
