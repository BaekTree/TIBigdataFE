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

import { FooterComponent } from './modules/homes/footer/footer.component';
import { NavComponent } from './modules/homes/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    // MainContainerComponent
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // CoreModule,
    FormsModule,
    HttpModule,
    // HomesModule
    // BodyModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
