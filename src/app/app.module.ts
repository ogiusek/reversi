import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PuckComponent } from './puck/puck.component';
import { GetInfoComponent } from './get-info/get-info.component';
import { GuiComponent } from './gui/gui.component';
import { BoardComponent } from './board/board.component';
import { VirtualEnemyComponent } from './virtual-enemy/virtual-enemy.component';

@NgModule({
  declarations: [
    AppComponent,
    PuckComponent,
    GetInfoComponent,
    GuiComponent,
    BoardComponent,
    VirtualEnemyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
