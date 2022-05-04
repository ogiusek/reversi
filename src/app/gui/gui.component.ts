import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.css']
})
export class GuiComponent{
  @Input('whitePoints') bPoints = 0;
  @Input('blackPoints') wPoints = 0;
  @Input('color') turn = 'b';
  colorName = this.turn == 'b' ? 'black':'white';
  Reset(){

  }
  Back(){
    
  }
}
