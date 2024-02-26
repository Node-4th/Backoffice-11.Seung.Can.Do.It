export class EmailController {
  constructor(spreadsheetService, emailService) {
    this.spreadsheetService = spreadsheetService;
    this.emailService = emailService;
  }

  sendEmails = async (req, res) => {
    try {
      await this.spreadsheetService.connectToSpreadsheet();
      const emailList = await this.spreadsheetService.getEmailList();
      await this.emailService.sendEmails(emailList);
      res.status(200).json({
        success: true,
        message: "이메일이 성공적으로 발송되었습니다.",
      });
    } catch (error) {
      console.error("Controller에서 이메일 발송 실패:", error);
      res.status(500).json({ error: "Controller에서 이메일 발송 실패" });
    }
  };
}
