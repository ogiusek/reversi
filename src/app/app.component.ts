import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  blocksArray: string[][] = [];
  arrayLength = 8;
  colorTurn = 'b';
  ngOnInit(): void{
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
  Reset(){
    this.blocksArray = [];
    this.colorTurn = 'b';
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
  ChangeColor(){
    if(this.colorTurn == 'b'){
      this.colorTurn = 'w';
    }else{
      this.colorTurn = 'b';
    }
  }
}
