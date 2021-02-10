import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElasticsearchService } from 'src/app/modules/communications/elasticsearch-service/elasticsearch.service';
import { AuthService } from '../../../../communications/fe-backend-db/membership/auth.service';

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.less"]
})
export class SearchResultComponent implements OnInit {

  public relatedKeywords = [];
  queryText: string;
  private isResultFound: boolean;

  constructor(
    private auth: AuthService,
    public _router: Router,
    private es: ElasticsearchService,
  ) {
  }
  ngOnInit() {
    if (this.es.getKeyword() === null || this.es.getKeyword() === undefined) {
      window.alert('비정상적인 접근입니다.');
      this._router.navigateByUrl('/');
    }
  }

  setRelatedKeywords(keys: string[]) {
    this.relatedKeywords = keys;
  }

  async freqAnalysis() {
    this._router.navigateByUrl("search/freqAnalysis");
  }

  relatedSearch(keyword: string) {
    this.es.searchKeyword(keyword);
  }
}
