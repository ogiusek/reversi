import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-virtual-enemy',
  templateUrl: './virtual-enemy.component.html',
  styleUrls: ['./virtual-enemy.component.css']
})
export class VirtualEnemyComponent implements OnChanges{
  @Input('informations') enemyInfo = {
    enemy:'',
    enemyLevel:0
  };
  @Input('position') board = {
    board:[['']],
    colorTurn:''
  };
  blocksArray = [['']];
  colorTurn = '';
  @Output('move') move = new EventEmitter<{x:number, y:number}>();
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
  movesHistory: string[][][] = [];
  colorsHistory: string[] = [];
  x = 0;
  y = 0;
  ngOnChanges(){
    // console.log('?');
    setTimeout(() => {
      if(this.enemyInfo.enemy == this.board.colorTurn){
        this.colorTurn = this.board.colorTurn;
        // this.blocksArray = this.blocksArray;
        if(this.colorTurn == this.enemyInfo.enemy){        
          this.blocksArray = this.GetBoard();
          this.SaveMove();
          this.MakeMove();  
        }
      }
    }, 1);
  }
  GetBoard(){
    let simpleArray = this.board.board.toString().split(',');
    let readyArray: string[][] = [];
    for (let i = 0; i < this.board.board.length; i++) {
      readyArray.push([]);
      for (let j = 0; j < this.board.board.length; j++) {
        readyArray[i].push(simpleArray[i * 8 + j]);
      }
    }
    return readyArray;
  }
  MakeMove(){
    let moves = this.FindMoves();
    let bestMove = {score: 0, index: 0};
    if(this.CountBlocks('') > 0){
      switch(this.enemyInfo.enemyLevel){
        case 0:
          bestMove = this.SimpleEnemy(bestMove, moves);
          break;
        case 1:
          break;
        case 2:
          bestMove = this.SimpleEnemyP(bestMove, moves);
          break;
        case 3:
          break;
        case 4:
          bestMove = this.HardEnemy(bestMove, moves);
          break;
      }
      this.move.emit({x:moves[bestMove.index][0], y:moves[bestMove.index][1]});
    }
  }
  SimpleEnemy(bestMove = {score: 0, index: 0}, moves = this.FindMoves()){
    for (let index = 0; index < moves.length; index++) {
      this.AddBlock(moves[index][0], moves[index][1]);
      let score = this.CountBlocks(this.enemyInfo.enemy);
      this.RestoreMove();
      if(score > bestMove.score){
        bestMove.score = score;
        bestMove.index = index;
      }
    }
    return bestMove;
  }
  SimpleEnemyP(bestMove = {score: 0, index: 0}, moves = this.FindMoves()){
    for (let index = 0; index < moves.length; index++) {
      this.AddBlock(moves[index][0], moves[index][1]);
      let score = this.CountPoints(this.enemyInfo.enemy);
      this.RestoreMove();
      if(score > bestMove.score){
        bestMove.score = score;
        bestMove.index = index;
      }
    }
    return bestMove;
  }
  HardEnemy(bestMove = {score: 0, index: 0}, moves = this.FindMoves()){
    return bestMove;
  }
  FindMoves(){
    let moves: number[][] = [];
    for (let x = 0; x < this.blocksArray.length; x++) {
      for (let y = 0; y < this.blocksArray[x].length; y++) {
        if(this.FindMoveFor(x, y)){
          moves.push([x, y]);
        }
      }
    }
    return moves;
  }
  ChangeColor(){
    this.colorTurn = this.colorTurn == 'w' ? 'b':'w';
  }
  RestoreMove(){
    if(this.movesHistory.length > 0){
      this.blocksArray = this.movesHistory[0];
      this.movesHistory.shift();
      this.colorTurn = this.colorsHistory[0];
      this.colorsHistory.shift();
    }
  }
  CountMoves(){
    let moveAmount = 0;
    for (let i = 0; i < this.blocksArray.length; i++) {
      for (let j = 0; j < this.blocksArray[i].length; j++) {
        if(this.FindMoveFor(i, j)){
          moveAmount++;
        }
      }
    }
    return moveAmount;
  }
  FindMoveFor(x:number, y:number){
    if(this.blocksArray[x][y] != ''){
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
    let simpleArray = this.blocksArray.toString().split(',');
    let readyArray: string[][] = [];
    for (let i = 0; i < this.blocksArray.length; i++) {
      readyArray.push([]);
      for (let j = 0; j < this.blocksArray.length; j++) {
        readyArray[i].push(simpleArray[i * 8 + j]);
      }
    }
    this.movesHistory.unshift(readyArray);
    this.colorsHistory.unshift(this.colorTurn);
  }
  AddBlock(x:number, y:number){
    this.SaveMove();
    this.ReplaceDirections(x, y);
    this.blocksArray[x][y] = this.colorTurn;
    this.ChangeColor();
    setTimeout(() => {
      if(this.CountMoves() < 1){
        this.ChangeColor();
        setTimeout(() => {
          if(this.CountMoves() < 1){
            this.ChangeColor();
            // this.EndGame();
          }  
        }, 1);
      }
    }, 1);
  }
  CountBlocks(blocks: string){
    let foundBlocks = 0;
    for (let x = 0; x < this.blocksArray.length; x++) {
      for (let y = 0; y < this.blocksArray[x].length; y++) {
         if(this.blocksArray[x][y] == blocks){
          foundBlocks++;
         }
      }
    }
    return foundBlocks;
  }
  CountPoints(blocks: string){
    let foundBlocks = 0;
    for (let x = 0; x < this.blocksArray.length; x++) {
      for (let y = 0; y < this.blocksArray[x].length; y++) {
        if(this.blocksArray[x][y] == blocks){
          if((x == 0 || x == this.blocksArray.length - 1) && (y == 0 || y == this.blocksArray.length - 1)){
            foundBlocks += 10;
          }else if((x == 0 || x == this.blocksArray.length - 1) || (y == 0 || y == this.blocksArray.length - 1)){
            foundBlocks+= 3;
          }else{
            foundBlocks++;
          }
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
    let nextBlock = this.blocksArray[x + direction[0]][y + direction[1]];  
    this.blocksArray[x][y] = this.colorTurn;
    if(nextBlock != this.colorTurn){
      this.ReplaceDirection(x + direction[0], y + direction[1], direction);
    }
  }
  FindDirection(x:number, y:number, direction: number[]): boolean{
    if(x + direction[0] >= 0 && y + direction[1] >= 0 && x + direction[0] <= 7 && y + direction[1] <= 7){
      let block = this.blocksArray[x][y];
      let nextBlock = this.blocksArray[x + direction[0]][y + direction[1]];
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
