export class ProjectsController {
  constructor(projectsService) {
    this.projectsService = projectsService;
  }
  getAllProjects = async (req, res, next) => {
    try {
      // Request
      const orderKey = req.query.orderKey ?? "id";
      const orderValue = req.query.orderValue ?? "desc";

      // 유효성 검사
      if (!["id"].includes(orderKey))
        throw new Error("orderKey 가 올바르지 않습니다.");
      if (!["asc", "desc"].includes(orderValue.toLowerCase()))
        throw new Error("orderValue 가 올바르지 않습니다.");

      // 프로젝트 목록 조회
      const projects = await this.projectsService.getAllProjects(
        orderKey,
        orderValue,
      );

      // Response
      return res.json({ success: true, data: projects });
    } catch (error) {
      next(error);
    }
  };

  getProjectByProjectId = async (req, res, next) => {
    try {
      //Requests
      const { projectId } = req.params;

      //유효성 검사
      if (!projectId) throw new Error("projectId는 필수값입니다.");

      //프로젝트 상세조회
      const project =
        await this.projectsService.getProjectByProjectId(projectId);

      //Response
      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  };

  createProject = async (req, res, next) => {
    try {
      //Request
      const userId = req.user.id;
      const { title, category, start, end } = req.body;

      //유효성 검사
      if (!title) throw new Error("프로젝트명은 필수 입력 항목입니다.");
      if (!category) throw new Error("프로젝트 유형은 필수 입력 항목입니다.");
      if (!start) throw new Error("프로젝트 시작일은 필수 입력 항목입니다.");
      if (!end) throw new Error("프로젝트 종료일은 필수 입력 항목입니다.");
      if (!["TIL", "PERSONAL_PROJECT", "TEAM_PROJECT"].includes(category))
        throw new Error(
          "올바르지 않은 프로젝트 유형입니다. 프로젝트 유형은 'TIL', 'PERSONAL_PROJECT', 'TEAM_PROJECT' 중 하나의 항목만 기재하실 수 있습니다.",
        );

      //서비스 계층에 프로젝트 생성 요청
      const createdProject = await this.projectsService.createProject(
        userId,
        title,
        category,
        start,
        end,
      );
      //Response
      res.status(201).json({
        success: true,
        message: "프로젝트가 성공적으로 생성되었습니다.",
        data: createdProject,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProject = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { projectId } = req.params;
      const { title, category, start, end } = req.body;

      if (!title) throw new Error("프로젝트명은 필수 입력 항목입니다.");
      if (!category) throw new Error("프로젝트 유형은 필수 입력 항목입니다.");
      if (!deadline) throw new Error("프로젝트 기한은 필수 입력 항목입니다.");
      if (!["TIL", "PERSONAL_PROJECT", "TEAM_PROJECT"].includes(category))
        throw new Error(
          "올바르지 않은 프로젝트 유형입니다. 프로젝트 유형은 'TIL', 'PERSONAL_PROJECT', 'TEAM_PROJECT' 중 하나의 항목만 기재하실 수 있습니다.",
        );

      const updatedProjcet = await this.projectsService.updateProject(
        userId,
        projectId,
        title,
        category,
        start,
        end,
      );

      res.status(200).json({
        success: true,
        message: "프로젝트가 성공적으로 수정되었습니다.",
        data: updatedProjcet,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (req, res, next) => {
    try {
      const userId = req.user.id;

      const { projectId } = req.params;

      await this.projectsService.deleteProject(userId, projectId);

      res.status(200).json({
        success: true,
        message: "프로젝트가 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllNotSubmitUser = async (req, res, next) => {
    try {
      const { id } = req.user;
      const userId = id;
      console.log("----------1-----------", userId);
      const { category, start } = req.body;

      // const userId = req.user.id;
      console.log("User ID:", id);
      console.log("Category:", category);
      console.log("Start:---------여기까지 컨트롤러", start);
      const notSubmitUsers = await this.projectsService.getAllNotSubmitUser(
        id,
        category,
        start,
      );
      console.log("이제 정말 끝임:", notSubmitUsers);
      res.status(200).json({
        success: true,
        message: "미제출자 인간들을 성공적으로 가려냈습니다.",
        data: notSubmitUsers,
      });
    } catch (error) {
      console.error("Error in getAllNotSubmitUser:", error);
      res.status(400).json({ message: "컨트롤러에서 터짐" });
    }
  };
}
