import { Injectable } from "@angular/core";
import { CloudData } from "angular-tag-cloud-module";
import { AnalysisDatabaseService } from "../analysis-database-service/analysis.database.service";

@Injectable({
  providedIn: "root",
})
export class WordcloudService {
  constructor(private db: AnalysisDatabaseService) { }

  /**
   * @description create wordcloud data for given article id
   * @param id article id to generate wordcloud data
   */
  async createCloud(id: string) {
    let cloudData = new Array<CloudData>();
    let data = await this.db.getTfidfVal(id, 15, true);
    let tfidfData = data[0] as [];
    let tfIdfVal = tfidfData["tfidf"] as [];
    tfIdfVal.map((v) => {
      cloudData.push({
        text: v[0],
        weight: v[1],
      });
    });
    return cloudData;
  }
}
