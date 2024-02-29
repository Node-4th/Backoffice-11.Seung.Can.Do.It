/** 컨트롤러 계층 패턴
 * 0. try...catch 구문으로 에러핸들러에 에러 전달
 * 1. Request : 클라이언트로부터 전달 받는 데이터(입력값)
 * 2. 입력값에 대한 유효성 검사 (검증 로직 X)
 * 3. 서비스 계층에 요청
 * 4. Response : 클라이언트에게 반환할 데이터
 */

export class ClassesController {
  constructor(classesService) {
    this.classesService = classesService;
  }

  getClassByClassId = async (req, res, next) => {
    try {
      //Requests
      const { classId } = req.params;

      //유효성 검사
      if (!classId) throw new Error("classId는 필수값입니다.");

      //클래스 상세조회
      const myClass = await this.classesService.getClassByClassId(classId);

      //Response
      return res.status(200).json({ success: true, data: myClass });
    } catch (error) {
      next(error);
    }
  };

  createClass = async (req, res, next) => {
    try {
      //Request
      const { id } = req.user;
      const userId = id;
      const { name } = req.body;

      //유효성 검사
      if (!name) {
        throw new Error("클래스명은 필수 입력 항목입니다.");
      }

      //서비스 계층에 클래스 생성 요청
      const createdClass = await this.classesService.createClass(userId, name);

      if (createdClass === null) {
        return res
          .status(400)
          .json({ success: false, message: "이미 생성한 사용자입니다." });
      }

      //Response
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
