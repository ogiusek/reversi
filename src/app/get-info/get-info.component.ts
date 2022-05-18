import { Component, Input,  Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnChanges{
  @Input('lastEnemy') enemyChoice = 'p';
  @Input('lastEnemyLevel') enemyLevel = 0;
  @Output('enemyInformations') beginInformations = new EventEmitter<{
    enemy:string, 
    enemyLevel:number
  }>();
  show = true;
  showRange = false;
  ngOnChanges(){
    this.showRange = this.enemyChoice == 'p' ? false:true;
  }
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
      enemyLevel:this.enemyLevel
    };
    this.beginInformations.emit(informations);
    this.show = false;
  }

}
