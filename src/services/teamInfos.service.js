export class TeamInfosService {
    constructor(teamInfosRepository) {
        this.teamInfosRepository = teamInfosRepository;
    }

    findTeamInfos = async (teamInfoId) => {
        if (!teamInfoId) {
            throw new Error('팀 소개페이지를 선택하세요.');
        }

        const teamInfo = await this.teamInfosRepository.findTeamInfos(teamInfoId);

        if (!teamInfo) {
            throw new Error('팀 소개페이지가 없습니다.');
        }

        return teamInfo;
    };

    findTeam = async (teamId, userId) => {
        if (!teamId) {
            throw new Error('팀을 선택하세요.');
        }

        const team = await this.teamInfosRepository.findTeam(teamId);

        if (!team) {
            throw new Error('팀이 없습니다.');
        }

        if (!(team.userId.includes(userId))) {
            throw new Error('팀 소개페이지에 대한 권한이 없습니다.');
        }

        return team;
    };

    createTeamInfos = async (teamId, teamName, groundRules, goals, content) => {
        if (!teamName || !groundRules || !goals || !content) {
            throw new Error('필수 값이 입력되지 않았습니다.');
        }

        const teamInfo = await this.teamInfosRepository.createTeamInfos(
            teamId,
            teamName,
            groundRules,
            goals,
            content
        );

        return teamInfo;
    };

    editTeamInfos = async (teamInfoId, teamName, groundRules, goals, content) => {
        if (!teamName || !groundRules || !goals || !content) {
            throw new Error('필수 값이 입력되지 않았습니다.')
        }

        const teamInfo = await this.teamInfosRepository.editTeamInfos(
            teamInfoId,
            teamName,
            groundRules,
            goals,
            content
        );

        return teamInfo;
    };

    deleteTeamInfos = async (teamInfoId) => {
        const teamInfo = await this.teamInfosRepository.deleteTeamInfos(teamInfoId);

        return teamInfo;
    };
};