export class TeamsController {
  constructor(teamsService) {
    this.teamsService = teamsService;
  }
  getAllTeams = async (req, res, next) => {
    try {
      // Request
      const orderKey = req.query.orderKey ?? "id";
      const orderValue = req.query.orderValue ?? "desc";

      // 유효성 검사
      if (!["id"].includes(orderKey))
        throw new Error("orderKey 가 올바르지 않습니다.");
      if (!["asc", "desc"].includes(orderValue.toLowerCase()))
        throw new Error("orderValue 가 올바르지 않습니다.");

      // 팀 목록 조회
      const teams = await this.teamsService.getAllTeams(orderKey, orderValue);

      // Response
      return res.json({ success: true, data: teams });
    } catch (error) {
      next(error);
    }
  };
  getTeamByTeamId = async (req, res, next) => {
    try {
      //Requests
      const { teamId } = req.params;

      //유효성 검사
      if (!teamId) throw new Error("teamId는 필수값입니다.");

      //프로젝트 상세조회
      const team = await this.teamsService.getProjectByTeamId(teamId);

      //Response
      return res.status(200).json({ success: true, data: team });
    } catch (error) {
      next(error);
    }
  };
  createTeam = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { projectId, name, memberList } = req.body;

      //유효성 검사
      if (!projectId || !name || !memberList)
        throw new Error("필수 값이 입력되지 않았습니다.");

      //서비스 계층에 팀 생성 요청
      const createdTeam = await this.teamsService.createTeam(
        userId,
        projectId,
        name,
        memberList,
      );
      //Response
      res.status(201).json({
        success: true,
        message: "팀이 성공적으로 생성되었습니다.",
        data: createdTeam,
      });
    } catch (error) {
      next(error);
    }
  };
  updateTeam = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { teamId } = req.params;
      const { projectId, name, memberList } = req.body;

      //유효성 검사
      if (!name || !memberList)
        throw new Error("필수 값이 입력되지 않았습니다.");

      //서비스 계층에 팀 생성 요청
      const updatedTeam = await this.teamsService.updateTeam(
        userId,
        teamId,
        projectId,
        name,
        memberList,
      );
      //Response
      res.status(201).json({
        success: true,
        message: "팀이 성공적으로 생성되었습니다.",
        data: updatedTeam,
      });
    } catch (error) {
      next(error);
    }
  };
  deleteTeam = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { teamId } = req.params;

      //서비스 계층에 팀 생성 요청
      await this.teamsService.deleteTeam(userId, teamId);
      //Response
      res.status(200).json({
        success: true,
        message: "팀이 성공적으로 생성되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
}
