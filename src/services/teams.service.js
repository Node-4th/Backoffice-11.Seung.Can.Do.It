export class TeamsService {
  constructor(teamsRepository) {
    this.teamsRepository = teamsRepository;
  }

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

  getAllTeams = async (orderKey, orderValue, projectId) => {
    const teams = await this.teamsRepository.getAllTeams(
      orderKey,
      orderValue,
      projectId,
    );
    return teams;
  };

  getTeamByTeamId = async (teamId) => {
    const team = await this.teamsRepository.getTeamByTeamId(teamId);
    if (!team) throw new Error("존재하지 않는 팀입니다.");
    return team;
  };

  createTeam = async (userId, projectId, name, memberList) => {
    await this.checkAdminRole(userId);

    const project = await this.teamsRepository.getProjectByProjectId(projectId);
    if (!project) throw new Error("존재하지 않는 프로젝트 입니다.");

    //팀 생성 요청
    const createdTeam = await this.teamsRepository.createTeam(
      name,
      projectId,
      memberList,
    );
    return createdTeam;
  };

  updateTeam = async (userId, teamId, projectId, name, memberList) => {
    await this.checkAdminRole(userId);

    const project = await this.teamsRepository.getProjectByProjectId(projectId);
    if (!project) throw new Error("존재하지 않는 프로젝트 입니다.");

    //팀 존재 확인
    await this.getTeamByTeamId(teamId);
    if (!teamId) throw new Error("존재하지 않는 팀입니다.");

    //팀 수정 요청
    const updatedTeam = await this.teamsRepository.updateTeam(
      teamId,
      projectId,
      name,
      memberList,
    );

    return updatedTeam;
  };

  deleteTeam = async (userId, teamId) => {
    await this.checkAdminRole(userId);

    // 팀 존재 확인
    await this.getTeamByTeamId(teamId);
    if (!teamId) throw new Error("존재하지 않는 팀입니다.");

    // 팀 삭제 요청
    return await this.teamsRepository.deleteTeam(teamId);
  };
}
