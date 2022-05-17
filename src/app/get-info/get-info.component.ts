import { Component, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent{
  @Output('enemyInformations') beginInformations = new EventEmitter<{
    enemy:string, 
    enemyLevel:number
  }>();
  show = true;
  enemyChoice = 'p';
  showRange = false;
  EnemyLevel = 0;

  ChangeChoice(choice: string){
    this.enemyChoice = choice;
    switch(choice){
      case 'p':
        this.showRange = false;
        break;
      case 'b':
        this.showRange = true;
        break;
      case 'w':
        this.showRange = true;
        break;
    }
  }
  Submit(){
    let informations = {
      enemy:this.enemyChoice,
      enemyLevel:this.EnemyLevel
    };
    this.beginInformations.emit(informations);
    this.show = false;
  }

}
