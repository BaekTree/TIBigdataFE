import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IpService } from "src/app/core/services/ip-service/ip.service";
import { ArticleService } from "src/app/core/services/article-service/article.service";
import { QueryResponse } from "../../models/query.response.model";

@Injectable({
  providedIn: "root",
})
export class AnalysisDatabaseService {
  private URL = this.ipService.getFrontDBServerIp();
  private GET_KEYWORDS_URL = this.URL + "/keyword/getKeyVal";
  private GET_RCMD_URL = this.URL + "/rcmd/getRcmdTbl";
  private GET_TOPIC_URL = this.URL + "/topic/getTopicTbl";
  private GET_TOPIC_plain_URL = this.URL + "/topic/getTopicTblPlain";
  private GET_ONE_TOPIC_DOCS_URL = this.URL + "/topic/getOneTopicDocs";

  constructor(
    private ipService: IpService,
    private http: HttpClient,
    private docControl: ArticleService
  ) { }
  readonly DEBUG: boolean = false;

  async getTopicTable(isPlain?: boolean) {
    let url = this.GET_TOPIC_URL;
    if (isPlain) url = this.GET_TOPIC_plain_URL;
    let res = await this.http.get<any>(url).toPromise();
    return res;
  }

  async getOneTopicDocs(tp: string) {
    let body = { topic: tp };

    let res = await this.http
      .post<any>(this.GET_ONE_TOPIC_DOCS_URL, body)
      .toPromise();

    return res;
  }

  async getRelatedDocsTbl(ids: string | string[], num?: number, sim?: boolean) {
    let res: QueryResponse = await this.http
      .post<any>(this.GET_RCMD_URL, { id: ids, num: num, sim: sim })
      .toPromise();
    if (res.isSuccess) {
      return res.payload;
    }
  }

  async getTfidfVal(ids: string | string[], num?: number, isVal?: boolean) {
    return new Promise((resolve) => {
      this.http
        .post<any>(this.GET_KEYWORDS_URL, { id: ids, num: num, isVal: isVal })
        .subscribe((res) => {
          resolve(res);
        });
    });
  }

  async loadRelatedDocs(id: string) {
    let _rcmdIdsRes = await this.getRelatedDocsTbl(id);

    console.log("idsres: ", _rcmdIdsRes);
    let rcmdIds = _rcmdIdsRes[0]["rcmd"];

    console.log("rcmds: ", rcmdIds);
    let _titlesRes = await this.docControl.convertDocIdsToTitles(
      rcmdIds as string[]
    );
    let titles = _titlesRes as [];

    console.log("titles: ", titles);

    let i = -1;
    let relatedDocs = titles.map((t) => {
      i++;
      return { id: rcmdIds[i], title: t };
    });

    console.log("related: ", relatedDocs);

    return relatedDocs;
  }
}
