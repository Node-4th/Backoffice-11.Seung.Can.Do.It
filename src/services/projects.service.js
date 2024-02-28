export class ProjectsService {
  constructor(projectsRepository) {
    this.projectsRepository = projectsRepository;
  }
  checkAdminRole = async (userId) => {
    const isAdmin = await this.projectsRepository.getUserByUserId(userId);
    if (!isAdmin) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    if (isAdmin.role !== "ADMIN") {
      throw new Error("관리자에게만 허용된 권한입니다.");
    }
    return isAdmin;
  };

  getAllProjects = async (orderKey, orderValue) => {
    const projects = await this.projectsRepository.getAllProjects(
      orderKey,
      orderValue,
    );

    return projects;
  };

  getProjectByProjectId = async (projectId) => {
    const project =
      await this.projectsRepository.getProjectByProjectId(projectId);
    if (!projectId) throw new Error("존재하지 않는 프로젝트입니다.");
    return project;
  };

  createProject = async (userId, title, category, start, end) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(userId);
    if (!isAdmin) {
      throw new Error("관리자만 프로젝트를 생성할 수 있습니다.");
    }
    // 프로젝트명 중복 확인
    const isExistProjectByTitle =
      await this.projectsRepository.getProjectByTitle(title);
    if (isExistProjectByTitle) {
      throw new Error("이미 존재하는 프로젝트명입니다.");
    }
    //레파지토리 계층에 프로젝트 생성 요청
    const createdProject = await this.projectsRepository.createProject(
      title,
      category,
      start, // dateformat
      end,
    );

    /**
1 prisma String
2 service dateformat(formattedstart
3 repo formatted 애들 지워버리기
   */

    //Return
    return createdProject;
  };

  updateProject = async (userId, projectId, title, category, start, end) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(userId);
    if (!isAdmin) {
      throw new Error("관리자만 프로젝트를 수정할 수 있습니다.");
    }
    // 프로젝트 존재 확인
    const isExistProjectByProjectId =
      await this.projectsRepository.getProjectByProjectId(projectId);
    if (!isExistProjectByProjectId) {
      throw new Error("수정할 프로젝트가 존재하지 않습니다.");
    }
    //레파지토리 계층에 프로젝트 수정 요청
    const updatedProject = await this.projectsRepository.updateProject(
      projectId,
      title,
      category,
      start,
      end,
    );

    //Return
    return updatedProject;
  };

  deleteProject = async (userId, projectId) => {
    //Parameter - user.role이 admin인지 검증하기
    const isAdmin = await this.checkAdminRole(userId);
    if (!isAdmin) {
      throw new Error("관리자만 프로젝트를 삭제할 수 있습니다.");
    }
    // 프로젝트 존재 확인
    const isExistProjectByProjectId =
      await this.projectsRepository.getProjectByProjectId(projectId);
    if (!isExistProjectByProjectId) {
      throw new Error("삭제할 프로젝트가 존재하지 않습니다.");
    }
    //레파지토리 계층에 프로젝트 삭제 요청
    return await this.projectsRepository.deleteProject(projectId);
  };

  getAllNotSubmitUser = async (userId, category, start, end) => {
    //Parameter Console.log
    console.log("Service - User ID:", userId);

    //관리자인지 검증
    const isAdmin = await this.checkAdminRole(userId);
    console.log("Service - isAdmin", isAdmin);

    // 위의 절차에서 함께 가져온 classId와 projectId
    console.log("Service - isAdmin.classId:", isAdmin.classId); //1

    if (category === "TEAM_PROJECT") {
      const notSubmitTeams = await this.projectsRepository.getAllNotSubmitTeams(
        category,
        start,
        end,
        isAdmin.classId,
      );

      return notSubmitTeams;
    } else {
      // classId -> userId : 노드4기교육과정(class)에 소속된 User가 누구인지를 찾기 위함.

      // projectId -> taskId :발제한 특정 프로젝트(TIL, 개인과제, 팀과제)에 소속된 Tasks가 제출/미제출 되었는지 찾기 위함.

      const notSubmitUsers = await this.projectsRepository.getAllNotSubmitUser(
        category,
        start,
        end,
        isAdmin.classId, //classId
        // projectInfos.id, //projectId
      );

      return notSubmitUsers;
    }
  };
}
