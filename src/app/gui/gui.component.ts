import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.css']
})
export class GuiComponent implements OnChanges{
  @Input('points') blocks = {white:2, black:2};
  @Input('color') turn = 'b';
  @Input('finished') endTurn = false;
  @Output('reset') reset = new EventEmitter();
  @Output('back') back = new EventEmitter();
  finishText = this.blocks.black > this.blocks.white ? 'black won': this.blocks.white > this.blocks.black ? 'white won':'draw';
  ngOnChanges(){
    this.RefreshFinishText();
  }
  Reset(){
    this.reset.emit();
  }
  RefreshFinishText(){
    this.finishText = this.blocks.black > this.blocks.white ? 'black won': this.blocks.white > this.blocks.black ? 'white won':'draw';
  }
  Back(){
    this.back.emit();
  }
}