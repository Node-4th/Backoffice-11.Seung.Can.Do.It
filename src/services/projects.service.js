export class ProjectsService {
  constructor(projectsRepository) {
    this.projectsRepository = projectsRepository;
  }
  checkAdminRole = async (userId) => {
    const foundUser = await this.projectsRepository.getUserByUserId(userId);
    if (!foundUser) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    return foundUser.role === "ADMIN";
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

  createProject = async (userId, title, category, deadline) => {
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
      deadline,
    );

    // 프로젝트 생성 로그 기록
    // console.log(
    //   `${user.userId}번 관리자가 "${createdProject.title}" 프로젝트를 생성하였습니다.`,
    // );

    //Return
    return createdProject;
  };

  updateProject = async (userId, projectId, title, category, deadline) => {
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
      deadline,
    );

    // 프로젝트 수정 로그 기록
    // console.log(
    //   `${user.userId}번 관리자가 "${isExistProjectByProjectId.title}"에서 "${updateProject.title}"으로 프로젝트명을 수정하였습니다.`,
    // );

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

    // 프로젝트 삭제 로그 기록
    // console.log(
    //   `${user.userId}번 관리자가 "${isExistProjectByProjectId.title}" 프로젝트를 삭제하였습니다.`,
    // );
  };
}
