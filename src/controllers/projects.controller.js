export class ProjectsController {
  constructor(projectsService) {
    this.projectsService = projectsService;
  }
  getAllProjects = async (req, res, next) => {
    try {
      // Request
      const orderKey = req.query.orderKey ?? "projectId";
      const orderValue = req.query.orderValue ?? "desc";

      // 유효성 검사
      if (!["projectId", "status"].includes(orderKey))
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
      const user = req.user;
      const { title, category, deadline } = req.body;

      //유효성 검사
      if (!title) throw new Error("프로젝트명은 필수 입력 항목입니다.");
      if (!category) throw new Error("프로젝트 유형은 필수 입력 항목입니다.");
      if (!deadline) throw new Error("프로젝트 기한은 필수 입력 항목입니다.");
      if (!["TIL", "PERSONAL_PROJECT", "TEAM_PROJECT"].includes(category))
        throw new Error(
          "올바르지 않은 프로젝트 유형입니다. 프로젝트 유형은 'TIL', 'PERSONAL_PROJECT', 'TEAM_PROJECT' 중 하나의 항목만 기재하실 수 있습니다.",
        );

      //서비스 계층에 프로젝트 생성 요청
      const createdProject = await this.projectsService.createProject(
        user,
        title,
        category,
        deadline,
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
      const user = req.user;
      const { projectId } = req.params;
      const { title, category, deadline } = req.body;

      if (!title) throw new Error("프로젝트명은 필수 입력 항목입니다.");
      if (!category) throw new Error("프로젝트 유형은 필수 입력 항목입니다.");
      if (!deadline) throw new Error("프로젝트 기한은 필수 입력 항목입니다.");
      if (!["TIL", "PERSONAL_PROJECT", "TEAM_PROJECT"].includes(category))
        throw new Error(
          "올바르지 않은 프로젝트 유형입니다. 프로젝트 유형은 'TIL', 'PERSONAL_PROJECT', 'TEAM_PROJECT' 중 하나의 항목만 기재하실 수 있습니다.",
        );

      const updatedProjcet = await this.projectsService.updateProject(
        user,
        projectId,
        title,
        category,
        deadline,
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
      const user = req.user;
      const { projectId } = req.params;

      await this.projectsService.deleteProject(user, projectId);

      res.status(200).json({
        success: true,
        message: "프로젝트가 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
}
