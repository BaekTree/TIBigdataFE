import { Component, OnInit } from "@angular/core";
import { UserSavedDocumentService } from "src/app/core/services/user-saved-document-service/user-saved-document.service";
import { PaginationModel } from "src/app/core/models/pagination.model";
import { PaginationService } from "src/app/core/services/pagination-service/pagination.service";
import { ChartOption } from "src/app/core/enums/chart-option";
import { AnalysisOption } from "src/app/core/enums/analysis-option";
import { NONE_TYPE } from "@angular/compiler";

const keywordIconUrl: string = "../../../assets/icons/keyword-analysis";
const relatedIconUrl: string = "../../../assets/icons/related-doc";
const doughnutIconUrl: string = "../../../assets/icons/chart-doughnut";
const barIconUrl: string = "../../../assets/icons/chart-bar";
const lineIconUrl: string = "../../../assets/icons/chart-line-graph";
const wordcloudIconUrl: string = "../../../assets/icons/chart-word-cloud";

@Component({
  selector: "app-article-analysis",
  templateUrl: "./article-analysis.html",
  styleUrls: ["./article-analysis.less"],
})
export class ArticleAnalysisComponent implements OnInit {

  constructor(
    private paginationService: PaginationService,
    private userSavedDocumentService: UserSavedDocumentService
  ) { }

  private isChartLoaded = false;
  private isSavedDocsLoaded = false;
  private savedDocs: Array<{ title: string; id: string }>;
  private selectedChartType: ChartOption;
  private selectedAnalysisType: AnalysisOption;
  private selectedDataNum: number;
  private analysisDocIdsList: Array<string> = [];
  private pageInfo: PaginationModel;
  private totalSavedDocsNum: number;
  private iconUrls: Array<string> = [keywordIconUrl, relatedIconUrl, doughnutIconUrl, lineIconUrl, wordcloudIconUrl, barIconUrl]
  currentPage: number;
  pages: number[];

  ngOnInit(): void {
    this.selectedDataNum = 0;
    this.loadSavedDocs(1);
    this.initializeSettings();
  }

  /**
   * @description Load saved documents from userSavedDocumentService
   * @param pageNum 
   */
  async loadSavedDocs(pageNum: number): Promise<void> {
    this.isSavedDocsLoaded = false;
    this.totalSavedDocsNum = await this.userSavedDocumentService.getTotalDocNum();
    pageNum = this.handlePageOverflow(pageNum);
    this.currentPage = pageNum;
    this.savedDocs = await this.userSavedDocumentService.getMyDocs(pageNum);
    this.pageInfo = await this.paginationService.paginate(pageNum, this.totalSavedDocsNum, 10, 3);
    this.pages = this.pageInfo.pages;
    this.isSavedDocsLoaded = true;
  }

  /**
   * @description Helper function for page number to handle the page overflow 
   * @param pageNum 
   */
  handlePageOverflow(pageNum: number): number {
    if (pageNum < 0) pageNum = 1;
    else if (pageNum * 10 > this.totalSavedDocsNum) pageNum = this.totalSavedDocsNum / 10;
    return pageNum;
  }

  /**
   * @description Reset the analysis settings 
   */
  initializeSettings() {
    this.resetSelections();
    this.analysisDocIdsList = [];
    this.isChartLoaded = false;
  }

  selectedStyleObject(flag: boolean, backgroundIdx: number): Object {
    if (backgroundIdx == null && flag) return {
      "color": "white",
      "background-color": "#0FBAFF",
      "border": "none",
      "font-weight": "700",
    }
    else if (backgroundIdx == null && !flag) return {
      "color": "black",
      "background-color": "white",
    }
    else if (flag) {
      return {
        "color": "white",
        "background-color": "#0FBAFF",
        "border": "none",
        "font-weight": "700",
        "background-image": "url(" + this.iconUrls[backgroundIdx] + "-white.png" + ")"
      };
    } else {
      return {
        "color": "black",
        "background-color": "white",
        "background-image": "url(" + this.iconUrls[backgroundIdx] + ".png" + ")"
      };
    }
  }

  /**
   * @description Set the chart type as input 
   * @param type 
   */
  setChartType(type: ChartOption): void {
    this.selectedChartType = type;
  }

  /**
   * @description Set the analysis type as input
   * @param type 
   */
  setAnalysisType(type: AnalysisOption): void {
    this.selectedAnalysisType = type;
  }

  /**
   * @description Set the number of selected data as input
   * @param num 
   */
  setSelectedDataNum(num: number): void {
    this.selectedDataNum = num;
  }

  /**
   * @description Reset the selected setting 
   */
  resetSelections(): void {
    this.selectedAnalysisType = null;
    this.selectedChartType = null;
    this.selectedDataNum = 0;
  }

  /**
   * @description Add selected documents to analysis document list
   * @param idx 
   */
  addDocToAnalysis(idx: number) {
    this.analysisDocIdsList.push(this.savedDocs[idx].id);

  }

  generateChartAnalysisResult(): void { }

  generateWordCloud() { }
}