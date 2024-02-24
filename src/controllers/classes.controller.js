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

  /** 클래스 생성 - 3계층 로직

Controller에서는
<Request>
- 입력한 userId는 로그인할 때 발급된 jwt 토큰 정보가 담겨있고.  사용자 인증 미들웨어에서 req.user로 전달 받는다.

- 클래스를 등록할 때는 name, userId를 입력한다. -> controller req.body

<유효성 검사>
- 입력값은 유효성 검사를 거친다.
- try-catch 구문 next() 호출로 에러핸들러에 전달해야한다.

<클래스 생성>
- 유저 정보가 담긴 user와 name을 매개변수로 서비스 계층에 전달한다.
- 서비스 계층의 createClass 메서드를 호출하여 newClass 변수에 가공된 데이터를 할당한다.

<Response>
- 201번 상태코드와 json 형태로 success, message, newClass를 반환한다.



Service에서는 
<유저정보 조회 요청>
  - 레파지토리 계층에 getUserByUserId(user.userId)를 호출하여 userId로 조회를 요청한다.

<유저가 admin인지 검증>
  - user가 없으면 존재하지 않는 사용자입니다. 에러를 발생시킨다.
  - 전달받은 user 객체 안에 user.role !== admin이면 에러를 발생시킨다.

<클래스 생성 요청>
  - 레파지토리 계층에 createClass(user, name)을 호출하여 클래스 생성을 요청한다.

<Return>
  - 레파지토리 계층이 반환한 요청 결과를 newclass에 담는다.
  - newClass.name만 컨트롤러 계층에 반환한다.

Repository getUserByUserId에서는
<userId 조회>
  - prisma.class.findFirst(userId)로 Users 테이블의 유저정보를 끌어다가 조회한 결과를 서비스 계층에 반환한다.

Repository createClass에서는
<class 생성>
  - prisma.class.create(data)로 Users 테이블의 유저정보를 끌어다가 조회한 결과를 서비스 계층에 반환한다.
 */

  createClass = async (req, res, next) => {
    try {
      //Request
      const user = req.user;
      const { name } = req.body;

      //유효성 검사
      if (!name) {
        throw new Error("클래스명은 필수 입력 항목입니다.");
      }

      //서비스 계층에 클래스 생성 요청
      const newClass = await this.classesService.createClass(user, name);
      //Response
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
