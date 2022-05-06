import { Component, Input, Output, EventEmitter } from '@angular/core';
// import {  } from 'stream';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{
  @Input('array') arrayOfBlocks: string[][] = [];
  @Input('color') colorTurn:string = '';
  @Input('movesHistory') movesHistory: string[][][] = [];
  @Input('colorsHistory') colorsHistory: string[] = [];
  @Output('endGame') end = new EventEmitter();
  @Output('changeColor') changeColor = new EventEmitter();
  @Output('blocksAmount') blocksAmount = new EventEmitter<{whiteBlocks:number, blackBlocks:number}>();
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
  CountMoves(){
    let moveAmount = 0;
    for (let i = 0; i < this.arrayOfBlocks.length; i++) {
      for (let j = 0; j < this.arrayOfBlocks[i].length; j++) {
        if(this.FindMoveFor(i, j)){
          moveAmount++;
        }
      }
    }
    return moveAmount;
  }
  FoundMove(x:number = 0, y:number = 0){
    let foundMove = this.FindMoveFor(x, y);
    return foundMove;
  }
  FindMoveFor(x:number, y:number){
    if(this.arrayOfBlocks[x][y] != ''){
      return false;
    }
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
  SaveMove(){
    //when i add arrayOfBlocks to movesHistory then everything in array equals arrayOfBlocks
    let simpleArray = this.arrayOfBlocks.toString().split(',');
    let readyArray: string[][] = [];
    for (let i = 0; i < this.arrayOfBlocks.length; i++) {
      readyArray.push([]);
      for (let j = 0; j < this.arrayOfBlocks.length; j++) {
        readyArray[i].push(simpleArray[i * 8 + j]);
      }
    }
    this.movesHistory.unshift(readyArray);
    this.colorsHistory.unshift(this.colorTurn);
  }
  AddBlock(x:number, y:number){
    this.SaveMove();
    this.ReplaceDirections(x, y);
    this.arrayOfBlocks[x][y] = this.colorTurn;
    this.EmitBlocksAmount();
    this.changeColor.emit();
    setTimeout(() => {
      if(this.CountMoves() < 1){
        this.changeColor.emit();
        setTimeout(() => {
          if(this.CountMoves() < 1){
            this.changeColor.emit();
            this.end.emit();
          }  
        }, 1);
      }
    }, 1);
  }
  EmitBlocksAmount(){
    let wBlocks = this.CountSpecifiedBlocks('w');
    let bBlocks = this.CountSpecifiedBlocks('b');
    this.blocksAmount.emit({
      whiteBlocks: wBlocks, 
      blackBlocks: bBlocks
    });
  }
  CountSpecifiedBlocks(blocks: string){
    let foundBlocks = 0;
    for (let x = 0; x < this.arrayOfBlocks.length; x++) {
      for (let y = 0; y < this.arrayOfBlocks[x].length; y++) {
         if(this.arrayOfBlocks[x][y] == blocks){
          foundBlocks++;
         }
      }
    }
    return foundBlocks;
  }
  ReplaceDirections(x:number, y:number){
    for (let index = 0; index < this.directions.length; index++) {
      if(this.FindDirection(x, y, this.directions[index])){
        this.ReplaceDirection(x, y, this.directions[index]);
      }
    }
  }
  ReplaceDirection(x:number, y:number, direction: number[]){
    let nextBlock = this.arrayOfBlocks[x + direction[0]][y + direction[1]];  
    this.arrayOfBlocks[x][y] = this.colorTurn;
    if(nextBlock != this.colorTurn){
      this.ReplaceDirection(x + direction[0], y + direction[1], direction);
    }
  }
  FindDirection(x:number, y:number, direction: number[]): boolean{
    if(x + direction[0] >= 0 && y + direction[1] >= 0 && x + direction[0] <= 7 && y + direction[1] <= 7){
      let block = this.arrayOfBlocks[x][y];
      let nextBlock = this.arrayOfBlocks[x + direction[0]][y + direction[1]];
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
}