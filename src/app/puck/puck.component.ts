import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-puck',
  templateUrl: './puck.component.html',
  styleUrls: ['./puck.component.css']
})
export class PuckComponent{
  @Input('value') value: string = ' ';
  @Input('foundMove') move: boolean = false;
  @Output('addBlock') add = new EventEmitter<{}>();
  AddBlock(){
    // this.add.emit();
  }
}
