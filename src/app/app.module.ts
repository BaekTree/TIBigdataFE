import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './modules/homes/body/search/search.module';
import { SpecialsModule } from './modules/homes/body/specials/specials.module';
import { FooterComponent } from './modules/homes/footer/footer.component';
import { NavComponent } from './modules/homes/nav/nav.component';
import { MainHomeContainerComponent } from './modules/homes/body/main-home-container/main-home-container.component';
import { SearchBarComponent } from './modules/homes/body/main-home-container/search-bar/search-bar.component';
import { HomeGraphComponent } from './modules/homes/body/main-home-container/home-graph/home-graph.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { LibraryModule } from './modules/homes/body/library/library.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MainHomeContainerComponent,
    SearchBarComponent,
    HomeGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SearchModule,
    SpecialsModule,
    // CoreModule,
    FormsModule,
    HttpModule,
    TagCloudModule,
    LibraryModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
