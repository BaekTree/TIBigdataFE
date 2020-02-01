import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';

import { SearchResultComponent } from './search-result/search-result.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { ArticleDetailsComponent } from './querytest/article/article-details/article-details.component';
import { ShowArticlesComponent } from './querytest/article/show-articles/show-articles.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    SearchResultComponent,
    SearchFilterComponent,
    SearchNavComponent,
    ArticleDetailsComponent,
    ShowArticlesComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // exports:[
  //   SearchResultComponent
  // ]
})
export class SearchModule { }
