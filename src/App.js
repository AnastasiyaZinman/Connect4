import React, { Component } from 'react';
import GridCell from './components/GridCell';
import './App.css';
const COL_BOARD = 7,
  ROW_BOARD = 6;
class App extends Component {
  constructor() {
    super();
    this.state = {
      current: 'green', //first gamer, also can be blue
      board: [
        [], [], [], [], [], [], []  // 7 columns
      ],
      winMessage: false
    }
  }
  sendTileDrop = (x) => {
    console.log("tileDrop, ", x);
    let board = [...this.state.board];
    board[x].push(this.state.current);
    this.setState(board)
  }
  toggleUser = () => {
    let current = this.state.current === "green" ? "blue" : "green";
    this.setState({current: current});
  }
  //get index of the last element in the column
  getTopElement = (x) => {
    for (let j = 0; j < this.state.board[x].length; j++) {
      if (this.state.board[x][j + 1] === undefined) {
        return j
      }
    }
    return -1 //this.state.board[x].length
  }
  checkRowAndColumn = (x, currentUser) => {
    let y = this.getTopElement(x);
    // console.log(`y= ${y}`);
    let countByRow = 0, countByColumn = 0; let i = 0;
    while (i < this.state.board.length && countByRow < 4 && countByColumn < 4) {
      countByRow = (this.state.board[i][y] === currentUser) ? countByRow += 1 : countByRow = 0;
      countByColumn = (this.state.board[x][i] === currentUser) ? countByColumn += 1 : countByColumn = 0;
      i++
    }
    this.checkWinner(countByRow, countByColumn)
  }

  clearBoard() { 
    this.setState({board:[
      [], [], [], [], [], [], []  // 7 columns
    ]})
    this.createBoard()
  }
  checkWinner(count1,count2) {
    if (count1 === 4 || count2 === 4) {
      this.setState({winMessage : true});
      this.clearBoard()
    }
    else this.toggleUser();
  }
  createBoard = () => {
    const cells = [];
    for (let y = ROW_BOARD - 1; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < COL_BOARD; x++) {
        row.push(<GridCell
          board = {this.state.board}
          tileColor = {this.state.board[x][y]}
          currentUser = {this.state.current}
          sendTileDrop = {this.sendTileDrop}
          checkRowAndColumn = {this.checkRowAndColumn}
          key = {x + y}
          x = {x}
          y = {y}
        />)
      }
      cells.push(<div key={y} className="row">{row}</div>)
    }
    return cells
  }


  render() {
    return (
      <div className="App">
     
        <div> {(this.state.winMessage) ?`Win ${this.state.current}`: null }</div>
        {this.createBoard()}
      </div>
    );
  }
}

export default App;
