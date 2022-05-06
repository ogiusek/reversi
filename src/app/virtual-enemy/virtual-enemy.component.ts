import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-virtual-enemy',
  templateUrl: './virtual-enemy.component.html',
  styleUrls: ['./virtual-enemy.component.css']
})
export class VirtualEnemyComponent{
  @Input('informations') generalInfo = {
    enemy:'',
    enemyLevel:0
  };
  constructor() { }

}
