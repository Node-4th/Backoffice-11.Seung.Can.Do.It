export class TeamsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getAllTeams = async (req, res, next) => {};
  getTeamByTeamId = async (req, res, next) => {};
  createTeam = async (req, res, next) => {};
  updateTeam = async (req, res, next) => {};
  deleteTeam = async (req, res, next) => {};
}
