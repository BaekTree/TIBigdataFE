import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListContainerComponent } from './home-list-container/home-list-container.component';
import { HomesRoutingModule } from './homes-routing.module';
import { CoreModule } from '../core/core.module';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule} from '@angular/http';

import { QuerytestComponent } from './body/search/querytest/querytest.component';
import { ArticleDetailsComponent } from './body/search/querytest/article/article-details/article-details.component';
import { ShowArticlesComponent } from './body/search/querytest/article/show-articles/show-articles.component';

import { FlaskComponent } from './containers/flask/flask.component';
import { IssueComponent } from './containers/issue/issue.component';
import { SearchComponent } from './body/search/search/search.component';
import { GraphComponent } from './body/search/graph/graph.component';
import { FooterComponent } from './footer/footer.component';
import { SearchResultComponent } from './body/search/search-result/search-result.component';
import { SearchNavComponent } from './body/search/search-nav/search-nav.component';
import { AnalysisComponent } from './body/search/search-result/analysis/analysis.component';
import { SearchFilterComponent } from './body/search/search-filter/search-filter.component';
import { WordcloudComponent } from './body/search/search-result/wordcloud/wordcloud.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    HomeListContainerComponent,


    QuerytestComponent,
    ArticleDetailsComponent,
    ShowArticlesComponent,

    FlaskComponent,
    IssueComponent,
    SearchComponent,
    GraphComponent,
    FooterComponent,
    SearchResultComponent,
    SearchNavComponent,
    AnalysisComponent,
    SearchFilterComponent,
    WordcloudComponent,
    NavComponent

   
  ],
  imports: [
    CommonModule,
    HomesRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TagCloudModule

  ],
  providers: [

  ],
  exports:[HomeListContainerComponent]
})
export class HomesModule { }
