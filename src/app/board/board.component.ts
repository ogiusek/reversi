import { Component, Input, Output, EventEmitter } from '@angular/core';
// import {  } from 'stream';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{
  @Input('array') blocks: string[][] = [];
  @Input('color') colorTurn:string = '';
  @Output('changeColor') changeColor = new EventEmitter();
  directions = [
    [-1, 0],
    [-1, 1],
    [ 0, 1],
    [ 1, 1],
    [ 1, 0],
    [ 1,-1],
    [ 0,-1],
    [-1,-1]
  ];
  FoundMove(x:number = 0, y:number = 0){
    let foundMove = this.FindMoveFor(x, y);
    return foundMove;
  }
  FindMoveFor(x:number, y:number, replace: boolean = false){
    let found = false;
    let possibleDirections: number[] = [];
    for (let index = 0; index < this.directions.length; index++) {
      if(this.FindDirection(x, y,this.directions[index])){
        possibleDirections.push(index);
        found = true;
      }
    }
    return found;
  }
  FindDirection(x:number, y:number, direction: number[]): boolean{
    if(x == 2 && y == 3){
      let a;
    }
    if(x > 0 && y > 0 && x < 7 && y < 7){
      let block = this.blocks[x][y];
      let nextBlock = this.blocks[x + direction[0]][y + direction[1]];
      if(nextBlock != ''){
        if(nextBlock == this.colorTurn){
          if(block != this.colorTurn && block != ''){
            return true;
          }
        }else{
          return this.FindDirection(x + direction[0], y + direction[1], direction);
        }
      }
    }
    return false;
  }
  AddBlock(x:number, y:number){
    this.blocks[x][y] = this.colorTurn;
  }
}