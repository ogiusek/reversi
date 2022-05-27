import { Component, Input,  Output, EventEmitter, OnChanges } from '@angular/core';
import { Color } from '../model/color';
@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnChanges{
  @Input('lastEnemy') enemyChoice = Color.transparent;
  @Input('lastEnemyLevel') enemyLevel = 0;
  @Output('enemyInformations') beginInformations = new EventEmitter<{
    enemy:Color, 
    enemyLevel:number
  }>();
  Color = Color;
  show = true;
  showRange = false;
  
  ngOnChanges(){
    this.showRange = this.enemyChoice == Color.transparent ? false:true;
  }
  
  ChangeChoice(choice: Color){
    this.enemyChoice = choice;
    switch(choice){
      case Color.transparent:
        this.showRange = false;
        break;
      case Color.black:
        this.showRange = true;
        break;
      case Color.white:
        this.showRange = true;
        break;
    }
  }
  
  Submit(){
    let informations = {
      enemy:this.enemyChoice,
      enemyLevel:this.enemyLevel
    };
    this.beginInformations.emit(informations);
    this.show = false;
  }
}