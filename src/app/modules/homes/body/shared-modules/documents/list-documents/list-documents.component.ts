import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy, } from "@angular/core";
import { Router } from "@angular/router";
import { ElasticsearchService } from 'src/app/modules/communications/elasticsearch-service/elasticsearch.service';
import { ArticleSource } from "../article/article.interface";
import { Subscription, Observable } from "rxjs";
import { IdControlService } from "src/app/modules/homes/body/shared-services/id-control-service/id-control.service";
import { HttpClient } from "@angular/common/http";
import { DocumentService } from "src/app/modules/homes/body/shared-services/document-service/document.service";
import { IpService } from "src/app/ip.service";
import { RecommendationService } from "src/app/modules/homes/body/shared-services/recommendation-service/recommendation.service";
import { AuthService } from '../../../../../communications/fe-backend-db/membership/auth.service';
import { AnalysisDatabaseService } from "../../../../../communications/fe-backend-db/analysis-db/analysisDatabase.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PaginationService } from "src/app/modules/homes/body/shared-services/pagination-service/pagination.service"
import { PaginationModel } from "../../../shared-services/pagination-service/pagination.model";
import { UserDocumentService } from "src/app/modules/communications/fe-backend-db/userDocument/userDocument.service";


@Component({
  selector: 'app-search-result-document-list',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.less']
})

export class ListDocumentsComponent implements OnInit, OnDestroy {
  orders = ['최신순', '과거순'];
  amounts = [10, 30, 50];
  form: FormGroup;


  @Input() isKeyLoaded: boolean;//키워드 검색으로 진입할 때
  @Output() relatedKeywordsReady = new EventEmitter<string[]>();//현재 검색어의 연관문서 완료되었을 때
  private ResultIdList: string[] = [];
  private selectedDocs: string[] = [];
  private relatedDocs: ArticleSource[][] = [];

  // private keywordChange$ : Observable<string> = this.es.getKeywordChange();
  private countNumChange$: Observable<any> = this.es.getCountNumChange();
  private searchStatusChange$: Observable<boolean> = this.es.getSearchStatus();
  private articleChange$: Observable<ArticleSource[]> = this.es.getArticleChange();

  // private keywordSubs : Subscription;
  private countNumSubs: Subscription;
  private articleSubs: Subscription;
  private loginStatSubs: Subscription;
  private isSearchDoneSubs: Subscription;
  private articleSources: ArticleSource[];

  private RelatedDocBtnToggle: Array<boolean>;
  private isResultFound: boolean;
  private isLogStat: Number = 0;
  private isSearchDone: boolean;
  private searchResultNum: string = "0";
  private numDocsPerPages: number = this.es.getNumDocsPerPage();
  private currentPage: number = 1;
  private selectedPageNum: number = 1;

  private queryText: string;
  pages: number[];
  startIndex: number;
  totalPages: number = 1;
  totalDocs: number;
  cmService: any;
  pageInfo: any;
  pageSize: number = 10;

  constructor(
    private userDocumentService: UserDocumentService,
    private idControl: IdControlService,
    private router: Router,
    private es: ElasticsearchService,
    private db: AnalysisDatabaseService,
    private fb: FormBuilder,
    private pgService: PaginationService,
  ) {

    this.articleSubs = this.articleChange$.subscribe(articles => {
      this.articleSources = articles;
      this.createResultIdList();
      this.setCheckboxProp();
      this.loadRelatedKeywords();
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      });
      if (this.articleSources !== undefined) this.isResultFound = true;
      else this.isResultFound = false;

      this.es.setSearchStatus(true);
    });

    this.isSearchDoneSubs = this.searchStatusChange$.subscribe(async status => {
      this.isSearchDone = status;
    })

    this.countNumSubs = this.countNumChange$.subscribe(async num => {
      this.totalDocs = num;
      this.queryText = this.es.getKeyword();
      this.searchResultNum = this.convertNumberFormat(num);
      this.loadPage(this.currentPage);
    })
  }

  ngOnDestroy() {
    this.loginStatSubs.unsubscribe();
    this.articleSubs.unsubscribe();
    this.countNumSubs.unsubscribe();
  }

  ngOnInit() {
    this.isResultFound = false;
    this.isSearchDone = false;
    this.currentPage = 1;
    this.loadSearchResult();
  }

  setCheckboxProp(): void {
    for (let i in this.articleSources) {
      this.articleSources[i]['isSelected'] = false;
    }
  }

  async loadSearchResult() {
    this.initialize_search();
  }

  setPageInfo(pageInfo: PaginationModel) {
    this.pages = pageInfo.pages;
    this.currentPage = pageInfo.currentPage;
    this.startIndex = pageInfo.startIndex;
    this.totalPages = pageInfo.totalPages;
  }


  async loadPage(currentPage: number) {
    let pageInfo: PaginationModel = await this.pgService.jumpPage(this.totalDocs, this.pageSize, currentPage);
    this.setPageInfo(pageInfo);
  }


  convertNumberFormat(num: number): string {
    let docCount: string = num.toString();
    if (num === 0) return docCount;

    return docCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  searchAgain(num: number) {
    this.es.setNumDocsPerPage(num);
    this.es.searchKeyword(this.queryText);
    this.articleSubs.unsubscribe();
    this.countNumSubs.unsubscribe();
    this.ngOnInit();
  }

  initialize_search() {
    this.isResultFound = false;
    this.idControl.clearIDList();
    this.ResultIdList = [];
    this.selectedDocs = [];
  }

  createResultIdList() {
    this.RelatedDocBtnToggle = [];
    for (var i in this.articleSources) {
      this.ResultIdList[i] = this.articleSources[i]["_id"];
      this.RelatedDocBtnToggle.push(false);
    }
    //console.log("result id list: ", this.ResultIdList)
  }

  openSelectedDoc(articleSourceIdx: number, RelatedDocIdx: number) {
    this.idControl.selectOneID(this.relatedDocs[articleSourceIdx][RelatedDocIdx]["id"]);
    this.navToDocDetail();
  }

  openRelatedDocList(i: number) {
    this.loadRelatedDocs(i); //load from flask
    this.RelatedDocBtnToggle[i] = !this.RelatedDocBtnToggle[i];
  }

  loadRelatedDocs(idx: number) {
    this.db.loadRelatedDocs(this.ResultIdList[idx]).then(res => {
      this.relatedDocs[idx] = res as [];
    });
  }

  loadRelatedKeywords() {
    let relatedKeywords: string[] = [];
    this.db.getTfidfVal(this.ResultIdList).then(res => {
      let data = res as []
      for (let n = 0; n < data.length; n++) {
        let tfVal = data[n]["tfidf"];
        if (relatedKeywords.length < 7 && tfVal[0] !== this.queryText && !relatedKeywords.includes(tfVal[0]))
          relatedKeywords.push(tfVal[0])
      }
      this.exportRelatedKeywords(relatedKeywords)
    })
    this.isKeyLoaded = true;
  }

  exportRelatedKeywords(relatedKeywords: string[]) {
    this.relatedKeywordsReady.emit(relatedKeywords);
  }

  saveSelectedDocs() {
    if (this.form.value['checkArray'].length == 0) {
      alert("담을 문서가 없습니다! 담을 문서를 선택해주세요.")
    } else {
      this.userDocumentService.saveNewDoc(this.form.value['checkArray']).then(() => {
        alert("문서가 나의 문서함에 저장되었어요.")
      });
    }
  }

  checkUncheckAll(isCheckAll: boolean, checkArray: FormArray) {
    if (isCheckAll) {
      for (let i = 0; i < this.articleSources.length; i++) {
        checkArray.push(new FormControl(this.articleSources[i]['_id']));
      }
    }
    else {
      checkArray.clear();
    }

    for (let i = 0; i < this.articleSources.length; i++) {
      this.articleSources[i]['isSelected'] = isCheckAll;
    }

    return checkArray
  }

  onCheckboxChange(e) {
    let checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.value === "toggleAll") {
      console.log('toggle');
      checkArray = this.checkUncheckAll(e.target.checked, checkArray);
    }
    else {
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    }
  }

  openDocDetail(docId: string) {
    console.log("article detail id: ", docId);
    this.idControl.selectOneID(docId);
    this.navToDocDetail();
  }

  navToDocDetail() {
    this.router.navigateByUrl("search/DocDetail");
  }
}