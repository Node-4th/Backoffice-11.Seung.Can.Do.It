export class TeamsService {
  constructor(teamsRepository) {
    this.teamsRepository = teamsRepository;
  }
  getAllTeams = async (req, res, next) => {};
  getTeamByTeamId = async (userId, next) => {};
  createTeam = async (userId, next) => {};
  updateTeam = async (userId, next) => {};
  deleteTeam = async (userId, next) => {};
}
