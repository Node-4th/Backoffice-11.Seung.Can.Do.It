import { GoogleSpreadsheet } from "google-spreadsheet";
import fs from "fs";

export class SpreadsheetService {
  constructor() {
    this.serviceAccountKeyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
    this.doc = new GoogleSpreadsheet(); // 여기서 문제있음
  }

  connectToSpreadsheet = async () => {
    try {
      const serviceAccount = JSON.parse(
        fs.readFileSync(this.serviceAccountKeyPath),
      ); // 여기서 문제있음
      await this.doc.useServiceAccountAuth(serviceAccount);
      await this.doc.loadInfo();
      console.log("Google SpreadSheets API 연결 완료");
    } catch (error) {
      console.error("Spreadsheet 연결 실패 :", error);
      throw new Error("Spreadsheet 연결 실패");
    }
  };

  getEmailList = async () => {
    try {
      const sheet = this.doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      const emailList = rows.map((row) => row.email);
      console.log(emailList);
      return emailList;
    } catch (error) {
      console.error("Spreadsheet에서 emailList 조회 실패", error);
      throw new Error("Spreadsheet에서 emailList 조회 실패");
    }
  };
}
