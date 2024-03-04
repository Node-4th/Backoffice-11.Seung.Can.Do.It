export class TeamsController {
  constructor(teamsService) {
    this.teamsService = teamsService;
  }
  getAllTeams = async (req, res, next) => {
    try {
      const orderKey = req.query.orderKey ?? "id";
      const orderValue = req.query.orderValue ?? "desc";

      const { projectId } = req.params;
      const { role } = req.user;

      if (!["id"].includes(orderKey))
        throw new Error("orderKey 가 올바르지 않습니다.");
      if (!["asc", "desc"].includes(orderValue.toLowerCase()))
        throw new Error("orderValue 가 올바르지 않습니다.");

      const teams = await this.teamsService.getAllTeams(
        orderKey,
        orderValue,
        projectId,
      );

      // return res.json({ success: true, data: teams });
      switch (role) {
        case "ADMIN":
          res.render("admin_teams.ejs", { teams: teams });
          break;
        case "STUDENT":
          res.render("student_teams.ejs", { teams: teams });
          break;
      }
    } catch (error) {
      next(error);
    }
  };
  getTeamByTeamId = async (req, res, next) => {
    try {
      const { teamId } = req.params;
      const { role } = req.user;

      if (!teamId) throw new Error("teamId는 필수값입니다.");

      const team = await this.teamsService.getTeamByTeamId(teamId);
      const task = team.tasks.find((task) => task.id);
      // return res.status(200).json({ success: true, data: team });
      switch (role) {
        case "ADMIN":
          res.render("admin_team.ejs", { team });
          break;
        case "STUDENT":
          res.render("student_team.ejs", { team, task });
          break;
      }
    } catch (error) {
      next(error);
    }
  };
  createTeam = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, memberList } = req.body;
      const { projectId } = req.params;

      if (!projectId || !name || !memberList)
        throw new Error("필수 값이 입력되지 않았습니다.");

      const createdTeam = await this.teamsService.createTeam(
        userId,
        projectId,
        name,
        memberList,
      );
      // res.status(201).json({
      //   success: true,
      //   message: "팀이 성공적으로 생성되었습니다.",
      //   data: createdTeam,
      // });
      res.redirect(`/projects/${projectId}`);
    } catch (error) {
      next(error);
    }
  };
  updateTeam = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { projectId, teamId } = req.params;
      const { name, memberList } = req.body;
      console.log(req.body);

      if (!name || !memberList)
        throw new Error("필수 값이 입력되지 않았습니다.");

      const updatedTeam = await this.teamsService.updateTeam(
        userId,
        teamId,
        projectId,
        name,
        memberList,
      );

      // res.status(201).json({
      //   success: true,
      //   message: "팀이 성공적으로 수정되었습니다.",
      //   data: updatedTeam,
      // });
      return res.redirect(`/teams/${updatedTeam.id}`);
    } catch (error) {
      next(error);
    }
  };
  deleteTeam = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { teamId } = req.params;

      const deleteTeam = await this.teamsService.deleteTeam(userId, teamId);

      // res.status(200).json({
      //   success: true,
      //   message: "팀이 성공적으로 삭제되었습니다.",
      // });
      return res.redirect(`/teams/project/${deleteTeam.projectId}`);
    } catch (error) {
      next(error);
    }
  };
}
