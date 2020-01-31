import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BodyRoutingModule } from './body-routing.module';
import { SearchComponent }from './search/search/search.component';
import { MainContainerComponent } from './main-container/main-container.component';


@NgModule({
  declarations: [
    SearchComponent,
    MainContainerComponent,
  ],
  imports: [
    CommonModule,
    BodyRoutingModule
  ]
})
export class BodyModule { }
