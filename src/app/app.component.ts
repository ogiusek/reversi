import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  movesHistory: string[][][] = [];
  colorsHistory: string[] = [];
  blocksArray: string[][] = [];
  arrayLength = 8;
  colorTurn = 'b';
  finishedGame = false;
  enemyInformations = {
    enemy:'',
    enemyLevel:0
  };
  blocks = {
    white: 2,
    black: 2
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
    this.blocksArray = [];
    this.movesHistory = [];
    this.colorsHistory = [];
    this.colorTurn = 'b';
    this.finishedGame = false;
    for (let i = 0; i < this.arrayLength; i++) {
      this.blocksArray.push([]);
      for (let j = 0; j < this.arrayLength; j++) {
        this.blocksArray[i].push("");
      }
    }
    this.blocksArray[this.arrayLength / 2][this.arrayLength / 2] = "w";
    this.blocksArray[this.arrayLength / 2 - 1][this.arrayLength / 2 - 1] = "w";
    this.blocksArray[this.arrayLength / 2 - 1][this.arrayLength / 2] = "b";
    this.blocksArray[this.arrayLength / 2][this.arrayLength / 2 - 1] = "b";
  }
  RestoreMove(){
    if(this.movesHistory.length > 0){
      this.blocksArray = this.movesHistory[0];
      this.movesHistory.shift();
      this.colorTurn = this.colorsHistory[0];
      this.colorsHistory.shift();
    }
  }
  ChangeColor(){
    if(this.colorTurn == 'b'){
      this.colorTurn = 'w';
    }else{
      this.colorTurn = 'b';
    }
  }
}
