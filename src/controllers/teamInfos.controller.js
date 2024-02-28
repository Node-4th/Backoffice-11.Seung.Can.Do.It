export class TeamInfosController {
    constructor(teamInfosService) {
        this.teamInfosService = teamInfosService;
    }

    findTeamInfos = async (req, res, next) => {
        try {
            const { teamInfoId } = req.params;

            const teamInfo = await this.teamInfosService.findTeamInfos(teamInfoId);

            return res.status(200).json({ data: teamInfo });
        } catch (err) {
            next(err);
        }
    };

    createTeamInfos = async (req, res, next) => {
        try {
            const { teamId } = req.params;
            const { teamName, groundRules, goals, content } = req.body;

            await this.teamInfosService.findTeam(
                teamId
            );
            await this.teamInfosService.createTeamInfos(
                teamId,
                teamName,
                groundRules,
                goals,
                content
            );

            return res.status(201).json({ success: 'true', message: '팀 소개페이지를 작성하였습니다.' });

        } catch (err) {
            next(err);
        }
    }

    editTeamInfos = async (req, res, next) => {
        try {
            const { teamInfoId } = req.params;
            const { teamName, groundRules, goals, content } = req.body;

            const findTeamInfos = await this.teamInfosService.findTeamInfos(teamInfoId);
            await this.teamInfosService.findTeam(
                findTeamInfos.teamId
            );
            const editTeamInfos = await this.teamInfosService.editTeamInfos(
                teamInfoId,
                teamName,
                groundRules,
                goals,
                content
            );

            return res.status(200).json({ success: 'true', message: '팀 소개페이지를 수정했습니다.', data: editTeamInfos });

        } catch (err) {
            next(err);
        }
    }

    deleteTeamInfos = async (req, res, next) => {
        try {
            const { teamInfoId } = req.params;

            const findTeamInfos = await this.teamInfosService.findTeamInfos(teamInfoId);
            await this.teamInfosService.findTeam(
                findTeamInfos.teamId
            );
            await this.teamInfosService.deleteTeamInfos(teamInfoId);

            return res.status(204).json({ success: 'true', message: '팀 소개페이지를 삭제했습니다.' });

        } catch (err) {
            next(err);
        }
    }
}