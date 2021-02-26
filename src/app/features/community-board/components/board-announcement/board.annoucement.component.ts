import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import moment from "moment";
import { PaginationModel } from "src/app/core/models/pagination.model";
import { UserProfile } from "src/app/core/models/user.model";
import { AuthenticationService } from "src/app/core/services/authentication-service/authentication.service";
import { PaginationService } from "src/app/core/services/pagination-service/pagination.service";
import { CommunityDocModel } from "../../models/community.doc.model";
import { CommunityBoardService } from "../../services/community-board-service/community.board.service";

@Component({
  selector: "app-announcement",
  templateUrl: "./board.annoucement.component.html",
  styleUrls: ["./board.annoucement.component.less"],
})
export class AnnouncementComponent implements OnInit {
  private _docList: Array<CommunityDocModel>;
  private _pageInfo: PaginationModel;
  private _pageSize = 10;
  private _totalDocs: number;
  private _startIndex: number;
  private _currentPage: number;
  private _pages: number[];
  private _totalPages: number;
  private _mainAnnounceNum: number;
  private _isSearchMode: boolean = false;
  private _searchText: string;
  private _isAdmin: boolean = false;
  private _currentUser: UserProfile;

  constructor(
    private router: Router,
    private communityBoardService: CommunityBoardService,
    private paginationService: PaginationService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getCurrentUserChange().subscribe((currentUser) => {
      this.currentUser = currentUser;
      if (currentUser !== null && currentUser.isAdmin === true)
        this.isAdmin = true;
      else this.isAdmin = false;
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadPage(1);
  }

  async loadPage(currentPage: number): Promise<void> {
    this.docList = [];

    await this.loadAnnouncements();
    if (this.isSearchMode) {
      this.totalDocs = await this.communityBoardService.getSearchDocsNum(
        this.searchText
      );
      await this.loadSearchResults();
    } else {
      this.totalDocs = await this.communityBoardService.getDocsNum();
      await this.loadGenerals();
    }

    let pageInfo: PaginationModel = await this.paginationService.paginate(
      currentPage,
      this.totalDocs,
      this.pageSize
    );
    this.setPageInfo(pageInfo);
  }

  async loadAnnouncements() {
    this.mainAnnounceNum = 0;
    let announceDocs: Array<CommunityDocModel> = await this.communityBoardService.getMainAnnounceDocs();
    if (announceDocs.length === 0) {
      this.mainAnnounceNum = 0;
    } else {
      this.saveDocsInFormat(announceDocs);
      this.mainAnnounceNum = announceDocs.length;
    }
  }

  async loadGenerals() {
    let generalDocs: Array<CommunityDocModel> = await this.communityBoardService.getDocs(
      this.startIndex
    );
    if (generalDocs.length !== 0) this.saveDocsInFormat(generalDocs);
  }

  async loadSearchResults() {
    let resultDocs: Array<CommunityDocModel> = await this.communityBoardService.searchDocs(
      this.searchText
    );
    if (resultDocs.length !== 0) this.saveDocsInFormat(resultDocs);
  }

  async searchDocs($event): Promise<void> {
    if (this.isSearchMode) return;
    this.searchText = $event.target.value;
    this.isSearchMode = true;
    await this.loadPage(1);
    this.isSearchMode = false;
  }

  setPageInfo(pageInfo: PaginationModel) {
    this.pages = pageInfo.pages;
    this.currentPage = pageInfo.currentPage;
    this.startIndex = pageInfo.startIndex;
    this.totalPages = pageInfo.totalPages;
  }

  saveDocsInFormat(list: {}[]): void {
    if (list == null) return;
    list.forEach((doc: CommunityDocModel) => {
      doc["regDate"] = moment(doc["regDate"]).format("YY-MM-DD");
      this.docList.push(doc);
    });
  }

  navToReadThisDoc(i: number) {
    this.communityBoardService.setSelectedDoc(this.docList[i]);
    this.router.navigateByUrl("community/announcement/read");
  }

  navToWriteNewDoc() {
    this.router.navigateByUrl("community/announcement/new");
  }

  //getters and setters
  public get docList(): Array<CommunityDocModel> {
    return this._docList;
  }
  public set docList(value: Array<CommunityDocModel>) {
    this._docList = value;
  }
  public get pageInfo(): PaginationModel {
    return this._pageInfo;
  }
  public set pageInfo(value: PaginationModel) {
    this._pageInfo = value;
  }
  public get pageSize() {
    return this._pageSize;
  }
  public set pageSize(value) {
    this._pageSize = value;
  }
  public get totalDocs(): number {
    return this._totalDocs;
  }
  public set totalDocs(value: number) {
    this._totalDocs = value;
  }
  public get startIndex(): number {
    return this._startIndex;
  }
  public set startIndex(value: number) {
    this._startIndex = value;
  }
  public get currentPage(): number {
    return this._currentPage;
  }
  public set currentPage(value: number) {
    this._currentPage = value;
  }
  public get pages(): number[] {
    return this._pages;
  }
  public set pages(value: number[]) {
    this._pages = value;
  }
  public get totalPages(): number {
    return this._totalPages;
  }
  public set totalPages(value: number) {
    this._totalPages = value;
  }
  public get mainAnnounceNum(): number {
    return this._mainAnnounceNum;
  }
  public set mainAnnounceNum(value: number) {
    this._mainAnnounceNum = value;
  }
  public get isSearchMode(): boolean {
    return this._isSearchMode;
  }
  public set isSearchMode(value: boolean) {
    this._isSearchMode = value;
  }
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(value: string) {
    this._searchText = value;
  }
  public get isAdmin(): boolean {
    return this._isAdmin;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
  public get currentUser(): UserProfile {
    return this._currentUser;
  }
  public set currentUser(value: UserProfile) {
    this._currentUser = value;
  }
}
