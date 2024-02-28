export class TeamsService {
  constructor(teamsRepository) {
    this.teamsRepository = teamsRepository;
  }
  // role 체크 메서드
  checkAdminRole = async (userId) => {
    const isAdmin = await this.teamsRepository.getUserByUserId(userId);
    if (!isAdmin) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    if (isAdmin.role !== "ADMIN") {
      throw new Error("관리자에게만 허용된 권한입니다.");
    }
    return isAdmin;
  };

  getAllTeams = async (orderKey, orderValue) => {
    const teams = await this.teamsRepository.getAllTeams(orderKey, orderValue);
    return teams;
  };

  getTeamByTeamId = async (teamId) => {
    const team = await this.teamsRepository.getTeamByTeamId(teamId);
    if (!team) throw new Error("존재하지 않는 팀입니다.");
    return team;
  };

  createTeam = async (userId, projectId, name, memberList) => {
    //Parameter - user.role이 admin인지 검증하기
    await this.checkAdminRole(userId);

    const project = await this.teamsRepository.getProjectByProjectId(projectId);
    if (!project) throw new Error("존재하지 않는 프로젝트 입니다.");

    //레파지토리 계층에 클래스 생성 요청
    const createdTeam = await this.teamsRepository.createTeam(
      name,
      projectId,
      memberList,
    );
    //Return
    return createdTeam;
  };

  updateTeam = async (userId, teamId, projectId, name, memberList) => {
    //Parameter - user.role이 admin인지 검증하기
    await this.checkAdminRole(userId);

    const project = await this.teamsRepository.getProjectByProjectId(projectId);
    if (!project) throw new Error("존재하지 않는 프로젝트 입니다.");

    // 클래스 존재 확인
    await this.getTeamByTeamId(teamId);

    //레파지토리 계층에 클래스 생성 요청
    const updatedTeam = await this.teamsRepository.updateTeam(
      teamId,
      projectId,
      name,
      memberList,
    );

    //Return
    return updatedTeam;
  };

  deleteTeam = async (userId, teamId) => {
    //Parameter - user.role이 admin인지 검증하기
    await this.checkAdminRole(userId);

    // 클래스 존재 확인
    await this.getTeamByTeamId(teamId);

    //레파지토리 계층에 클래스 생성 요청
    return await this.teamsRepository.deleteTeam(teamId);
  };
}
