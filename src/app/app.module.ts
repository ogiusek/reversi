import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PuckComponent } from './puck/puck.component';
import { FrontendComponent } from './frontend/frontend.component';
import { GetInfoComponent } from './get-info/get-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PuckComponent,
    FrontendComponent,
    GetInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
