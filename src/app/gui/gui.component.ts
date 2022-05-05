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
  @Output('reset') reset = new EventEmitter();
  @Output('back') back = new EventEmitter();
  colorName = this.turn == 'b' ? 'black':'white';
  Reset(){
    this.reset.emit();
  }
  Back(){
    this.back.emit();
  }
}