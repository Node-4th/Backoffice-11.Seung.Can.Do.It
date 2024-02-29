export class ProjectsController {
  constructor(projectsService, tasksService) {
    this.projectsService = projectsService;
    this.tasksService = tasksService;
  }
  getAllProjects = async (req, res, next) => {
    try {
      // Request
      const orderKey = req.query.orderKey ?? "id";
      const orderValue = req.query.orderValue ?? "desc";
      const category = req.query.category;
      const { role } = req.user;
      console.log(req.user);
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

      const tasks = await this.tasksService.findTaskCategory(category);

      const submitP = projects.map((project) => {
        tasks[0].map((task) => {
          if (task.projectId === project.id) {
            if (task.userId === req.user.id) {
              project.Status = '제출완료';
              return project;
            }
          }
        });
        return project;
      });

      // console.log(submit);
      // Response
      // return res.json({ success: true, data: projects });
      // return res.render('admin_projects.ejs', { projects: projects });
      switch (role) {
        case 'ADMIN':
          res.render('admin_projects.ejs', { projects });
          break;
        case 'STUDENT':
          switch (category) {
            case 'TIL':
              res.render('student_til.ejs', { projects });
              break;
            case 'PERSONAL_PROJECT':
              res.render('student_pps.ejs', { projects, submitP });
              break;
            case 'TEAM_PROJECT':
              res.render('student_tps.ejs', { projects });
              break;
          }
          break;
        case 'TUTOR':
          switch (category) {
            case 'PERSONAL_PROJECT':
              res.render('tutor_pp.ejs', { projects });
              break;
            case 'TEAM_PROJECT':
              res.render('tutor_tp.ejs', { projects });
              break;
          }
          break;
      }
    } catch (error) {
      next(error);
    }
  };

  getProjectByProjectId = async (req, res, next) => {
    try {
      //Requests
      const { projectId } = req.params;
      const { role, id } = req.user;

      //유효성 검사
      if (!projectId) throw new Error("projectId는 필수값입니다.");

      //프로젝트 상세조회
      const project =
        await this.projectsService.getProjectByProjectId(projectId);

      const tasks = project.tasks.find(task => task.userId === req.user.id);
      const task = tasks || "";

      console.log("============", task);
      //Response
      // return res.status(200).json({ success: true, data: project });
      switch (role) {
        case 'ADMIN':
          res.render('admin_project.ejs', { project });
          break;
        case 'STUDENT':
          switch (project.category) {
            case 'PERSONAL_PROJECT':
              res.render('student_pp.ejs', { project, task });
              break;
            case 'TEAM_PROJECT':
              res.render('student_tp.ejs', { project });
              break;
          }
          break;
      }
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
      // res.status(201).json({
      //   success: true,
      //   message: "프로젝트가 성공적으로 생성되었습니다.",
      //   data: createdProject,
      // });
      res.redirect('/projects');
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
      if (!start) throw new Error("프로젝트 시작일은 필수 입력 항목입니다.");
      if (!end) throw new Error("프로젝트 종료일은 필수 입력 항목입니다.");
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

  // Task 미제출자 목록 조회 API
  getAllNotSubmitUser = async (req, res, next) => {
    try {
      //Request
      const { id } = req.user;
      const userId = id;
      const { category, start, end } = req.query;
      console.log("============", req.query);
      //유효성 검사
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "조회할 프로젝트 유형을 입력해주세요.",
        });
      }
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (!["TIL", "PERSONAL_PROJECT", "TEAM_PROJECT"].includes(category))
        throw new Error(
          "올바르지 않은 프로젝트 유형입니다. 프로젝트 유형은 'TIL', 'PERSONAL_PROJECT', 'TEAM_PROJECT' 중 하나의 항목만 기재하실 수 있습니다.",
        );

      if (!start || !end) {
        return res.status(400).json({
          message:
            "발제한 날짜(시작일) 혹은 제출 마감일(종료일)을 입력해주세요.",
        });
      }

      //Request Console.log
      console.log("Controller - User ID:", id);
      console.log("Controller - Category:", category);
      console.log("Controller - Start:", start);
      console.log("Controller - End:", end);

      //서비스 계층에 조회 요청
      const notSubmitUsers = await this.projectsService.getAllNotSubmitUser(
        userId,
        category,
        startDate,
        endDate,
      );

      //Response
      console.log("Response 미제출자 목록 조회 성공:", notSubmitUsers);

      // res.status(200).json({
      //   success: true,
      //   message: "미제출자 인간들을 성공적으로 가려냈습니다😈😈😈",
      //   data: notSubmitUsers,
      // });
      res.render('admin_notsubmit.ejs', { notSubmitUsers: notSubmitUsers });
    } catch (error) {
      console.error("미제출자 목록 조회 실패:", error);
      next(error);
    }
  };

  // 미제출자 목록 슬랙
  notSubmitUserSendSlack = async (req, res, next) => {
    try {
      //Request
      const { id } = req.user;
      const userId = id;
      const { category, start, end } = req.body;
      //유효성 검사
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "조회할 프로젝트 유형을 입력해주세요.",
        });
      }
      if (!start || !end) {
        return res.status(400).json({
          message:
            "발제한 날짜(시작일) 혹은 제출 마감일(종료일)을 입력해주세요.",
        });
      }
      //서비스 계층에 조회 요청
      const notSubmitUsers = await this.projectsService.getAllNotSubmitUser(
        userId,
        category,
        start,
        end,
      );
      req.notSubmitUsers = notSubmitUsers;
      next();
    } catch (error) {
      console.error("미제출자 목록 조회 실패:", error);
      next(error);
    }
  };
}
