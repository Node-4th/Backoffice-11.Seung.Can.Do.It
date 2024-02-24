export class ClassesController {
  constructor(classesService) {
    this.classesService = classesService;
  }
  /** 컨트롤러 계층 패턴
   * 0. try...catch 구문으로 에러핸들러에 에러 전달
   * 1. Request : 클라이언트로부터 전달 받는 데이터(입력값)
   * 2. 입력값에 대한 유효성 검사 (검증 로직 X)
   * 3. 서비스 계층에 요청
   * 4. Response : 클라이언트에게 반환할 데이터
   */

  createClass = async (req, res, next) => {
    try {
      const { userId, className } = req.body;
      if (!userId || !className) {
        throw new Error(
          "userId와 className은 필수 입력 항목입니다. 관리자 번호와 클래스명을 확인해주세요.",
        );
      }

      // userId를 입력한 사람의 역할(role)이 admin인지 확인
      await this.classesService.verifyUserAdmin(userId);

      const newClass = await this.classesService.createClass(userId, className);
      res.status(201).json({
        success: true,
        message: "클래스가 성공적으로 생성되었습니다.",
        newClass,
      });
    } catch (error) {
      next(error);
    }
  };

  inviteUserToClass = async (req, res, next) => {
    try {
      const { classId } = req.params;
      const { userId, role } = req.body;
      if (!classId || !userId || !role) {
        throw new Error("classId, userId, role은 필수 입력 항목입니다.");
      }
      const userAddedToClass = await this.classesService.inviteUserToClass(
        classId,
        userId,
        role,
      );
      if (!userAddedToClass) {
        throw new Error("존재하지 않는 사용자이거나 역할이 맞지 않습니다.");
      }
      res.status(200).json({ message: "유저 초대 및 등록이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  matchTeams = async (req, res, next) => {
    try {
      const { classId } = req.params;
      if (!classId) {
        throw new Error("classId는 필수 입력 항목입니다.");
      }
      const teams = await this.classesService.matchTeams(classId);
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getTeamMembers = async (req, res, next) => {
    try {
      const { teamId } = req.params;
      if (!teamId) {
        throw new Error("teamId는 필수 입력 항목입니다.");
      }
      const teamMembers = await this.classesService.getTeamMembers(teamId);
      res.status(200).json(teamMembers);
    } catch (error) {
      next(error);
    }
  };
}
