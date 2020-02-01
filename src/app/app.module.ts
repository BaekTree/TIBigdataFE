import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule}  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CoreModule } from './modules/core/core.module';
// import { HomesModule } from './modules/homes/homes.module';

// import { BodyModule } from './modules/homes/body/body.module';

import { MainContainerComponent } from './modules/homes/body/main-container/main-container.component'
import { SearchBarComponent } from './modules/homes/body/search/search-bar/search-bar.component'
                              //'.modules/homes/body/search/search/search.component';
// import { MainContainerComponent } from './main-container/main-container.component';
import { MainGraphComponent } from './modules/homes/body/main-container/main-graph/main-graph.component';

import { TagCloudModule } from 'angular-tag-cloud-module';

import { FooterComponent } from './modules/homes/footer/footer.component';
import { NavComponent } from './modules/homes/nav/nav.component';
import {SearchModule} from './modules/homes/body/search/search.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MainContainerComponent,
    SearchBarComponent,
    MainGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // CoreModule,
    FormsModule,
    HttpModule,
    TagCloudModule,
    SearchModule
    // HomesModule
    // BodyModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
