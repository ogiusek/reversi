import { Component } from '@angular/core';
import { Color } from './model/color';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  Color = Color;
  movesHistory: Color[][][] = [];
  colorsHistory: Color[] = [];
  arrayLength = 8;
  colorTurn = Color.black;
  showGetInfo = true;
  finishedGame = false;
  arrayOfBlocks: Color[][] = [];
  blocks = {
    white: 2,
    black: 2
  };
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
  enemyInformations = {
    enemy:Color.transparent,
    enemyLevel:0
  };
  constructor(){
    this.Reset();
  }
  EndGame(){
    this.finishedGame = true;
  }
  WriteToBlocks(blocks: {whiteBlocks: number, blackBlocks: number}){
    this.blocks.white = blocks.whiteBlocks;
    this.blocks.black = blocks.blackBlocks;
  }
  Reset(){
    this.showGetInfo = false;
    this.showGetInfo = true;
    this.arrayOfBlocks = [];
    this.movesHistory = [];
    this.colorsHistory = [];
    this.colorTurn = Color.black;
    this.finishedGame = false;
    for (let i = 0; i < this.arrayLength; i++) {
      this.arrayOfBlocks.push([]);
      for (let j = 0; j < this.arrayLength; j++) {
        this.arrayOfBlocks[i].push(Color.transparent);
      }
    }
    this.arrayOfBlocks[this.arrayLength / 2][this.arrayLength / 2] = Color.white;
    this.arrayOfBlocks[this.arrayLength / 2 - 1][this.arrayLength / 2 - 1] = Color.white;
    this.arrayOfBlocks[this.arrayLength / 2 - 1][this.arrayLength / 2] = Color.black;
    this.arrayOfBlocks[this.arrayLength / 2][this.arrayLength / 2 - 1] = Color.black;
  }
  ChangeColor(){
    if(this.colorTurn == Color.black){
      this.colorTurn = Color.white;
    }else{
      this.colorTurn = Color.black;
    }
  }
  RestoreMove(){
    if(this.movesHistory.length > 0){
      this.arrayOfBlocks = this.movesHistory[0];
      this.movesHistory.shift();
      this.colorTurn = this.colorsHistory[0];
      this.colorsHistory.shift();
    }
  }
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
  FindMoveFor(x:number, y:number){
    if(this.arrayOfBlocks[x][y] != Color.transparent){
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
    let simpleArray = [...this.arrayOfBlocks].flat();
    let readyArray: Color[][] = [];
    for (let i = 0; i < this.arrayOfBlocks.length; i++) {
      readyArray.push([]);
      for (let j = 0; j < this.arrayOfBlocks.length; j++) {
        readyArray[i].push(simpleArray[i * 8 + j]);
      }
    }
    this.movesHistory.unshift(readyArray);
    this.colorsHistory.unshift(this.colorTurn);
  }
  AiAddBlock(x:number, y:number){
    this.AddBlock(x, y);
    this.colorsHistory.shift();
    this.movesHistory.shift();
  }
  AddBlock(x:number, y:number){
    this.SaveMove();
    this.ReplaceDirections(x, y);
    this.arrayOfBlocks[x][y] = this.colorTurn;
    this.EmitBlocksAmount();
    this.ChangeColor();
    setTimeout(() => {
      if(this.CountMoves() < 1){
        this.ChangeColor();
        setTimeout(() => {
          if(this.CountMoves() < 1){
            this.ChangeColor();
            this.EndGame();
          }  
        }, 1);
      }
    }, 1);
  }
  EmitBlocksAmount(){
    let wBlocks = this.CountSpecifiedBlocks(Color.white);
    let bBlocks = this.CountSpecifiedBlocks(Color.black);
    this.WriteToBlocks({
      whiteBlocks: wBlocks, 
      blackBlocks: bBlocks
    });
  }
  CountSpecifiedBlocks(blocks: Color){
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
      if(nextBlock != Color.transparent){
        if(nextBlock == this.colorTurn){
          if(block != this.colorTurn && block != Color.transparent){
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
