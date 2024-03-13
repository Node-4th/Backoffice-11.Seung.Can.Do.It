export class ClassesController {
  constructor(classesService) {
    this.classesService = classesService;
  }

  getClassByClassId = async (req, res, next) => {
    try {
      const { classId } = req.params;
      // const { classId } = req.user;
      const myClass = await this.classesService.getClassByClassId(classId);
      return res.status(200).json({ success: true, data: myClass });
      // return res.render("admin_class.ejs", { myClass: myClass });
    } catch (error) {
      next(error);
    }
  };

  createClass = async (req, res, next) => {
    try {
      const { id } = req.user;
      const userId = id;
      const { name } = req.body;
      if (!name) {
        throw new Error("클래스명은 필수 입력 항목입니다.");
      }

      const createdClass = await this.classesService.createClass(userId, name);

      /**
       * 03.01 if문 -> 서비스 계층으로 옮김.
       */

      // if (createdClass === null) {
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "이미 생성한 사용자입니다." });
      // }

      // res.status(201).render("admin_class.ejs", { class: createdClass });
      res.status(201).json({
        success: true,
        message: "클래스가 성공적으로 생성되었습니다.",
        data: createdClass,
      });
    } catch (error) {
      next(error);
    }
  };

  updateClass = async (req, res, next) => {
    try {
      const { id } = req.user;
      const userId = id;
      const { classId } = req.params;
      const { name } = req.body;

      if (!name) throw new Error("클래스명은 필수 입력 항목입니다.");

      const updatedClass = await this.classesService.updateClass(
        userId,
        classId,
        name,
      );

      res.status(200).json({
        success: true,
        message: "클래스가 성공적으로 수정되었습니다.",
        data: updatedClass,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteClass = async (req, res, next) => {
    try {
      const { id } = req.user;
      const userId = id;
      const { classId } = req.params;

      await this.classesService.deleteClass(userId, classId);

      res.status(200).json({
        success: true,
        message: "클래스가 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
}
