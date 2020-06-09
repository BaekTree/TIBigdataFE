import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import {MaterialModule} from '@angular/material';
import { MatNativeDateModule,MatInputModule,MatFormFieldModule,MatDatepickerModule, NativeDateModule } from "@angular/material";
// import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './modules/homes/body/search/search.module';
import { SpecialsModule } from './modules/homes/body/specials/specials.module';
import { FooterComponent } from './modules/homes/footer/footer.component';
import { NavComponent } from './modules/homes/nav/nav.component';
import { MainHomeContainerComponent } from './modules/homes/body/main-home-container/main-home-container.component';
import { HomeSearchBarComponent } from './modules/homes/body/main-home-container/home-search-bar/home-search-bar.component';
import { HomeGraphComponent } from './modules/homes/body/main-home-container/home-graph/home-graph.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { LibraryModule } from './modules/homes/body/library/library.module';
import { WordcloudService } from './modules/homes/graphs/wordcloud/wordcloud.service';
import { CoreModule} from './modules/core/core.module';
import { EPAuthService } from './modules/core/componets/membership/auth.service';
import { SearchHistoryComponent } from './modules/homes/body/main-home-container/search-history/search-history.component';
import { DatabaseService } from './modules/core/componets/database/database.service';

import { ChartsModule } from "ng2-charts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MainHomeContainerComponent,
    HomeSearchBarComponent,
    HomeGraphComponent,
    SearchHistoryComponent
  ],
  imports: [
    MatDatepickerModule, NativeDateModule ,MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SearchModule,
    SpecialsModule,
    CoreModule,
    FormsModule,
    TagCloudModule,
    LibraryModule,
    CoreModule,
    ChartsModule,
    BrowserAnimationsModule

  ],
  providers: [WordcloudService, EPAuthService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
