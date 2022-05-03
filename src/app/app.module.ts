import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PuckComponent } from './puck/puck.component';
import { GetInfoComponent } from './get-info/get-info.component';
import { GuiComponent } from './gui/gui.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    PuckComponent,
    GetInfoComponent,
    GuiComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
