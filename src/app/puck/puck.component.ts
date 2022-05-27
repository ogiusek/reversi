import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Color } from '../model/color';

@Component({
  selector: 'app-puck',
  templateUrl: './puck.component.html',
  styleUrls: ['./puck.component.css']
})
export class PuckComponent{
  @Input('value') value: Color = Color.transparent;
  @Input('foundMove') move: boolean = false;
  @Output('addBlock') add = new EventEmitter();
  @Output('loaded') loaded = new EventEmitter();
  Color = Color;
  AddBlock(){
    this.add.emit();
  }
}