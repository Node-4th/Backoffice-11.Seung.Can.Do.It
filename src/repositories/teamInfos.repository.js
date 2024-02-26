export class TeamInfosRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    findTeamInfos = async (teamInfoId) => {
        const teamInfo = await this.prisma.TeamInfos.findFirst({
            where: {
                teamInfoId
            }
        });

        return teamInfo;
    };

    findTeam = async (teamId) => {
        const team = await this.prisma.Teams.findFirst({
            where: {
                teamId
            }
        });

        return team;
    }

    createTeamInfos = async (teamId, teamName, groundRules, goals, content) => {
        const teamInfo = await this.prisma.TeamInfos.create({
            data: {
                teamId,
                teamName,
                groundRules,
                goals,
                content
            }
        });

        return teamInfo;
    };

    editTeamInfos = async (teamInfoId, teamName, groundRules, goals, content) => {
        const teamInfo = await this.prisma.TeamInfos.update({
            where: {
                teamInfoId
            },
            data: {
                teamName,
                groundRules,
                goals,
                content
            }
        });

        return teamInfo;
    };

    deleteTeamInfos = async (teamInfoId) => {
        const teamInfo = await this.prisma.TeamInfos.delete({
            where: {
                teamInfoId
            }
        });

        return teamInfo;
    };
};