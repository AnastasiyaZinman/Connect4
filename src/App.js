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
    // console.log("tileDrop, ", x);
    let board = [...this.state.board];
    board[x].push(this.state.current);
    this.setState(board)
  }
  toggleUser = () => {
    let current = this.state.current === "green" ? "blue" : "green";
    this.setState({ current: current });
  }
  //get index of the top element in the x-column, 
  //get j-index of current tile
  getTopElement = (x) => {
    for (let j = 0; j < this.state.board[x].length; j++) {
      if (this.state.board[x][j + 1] === undefined) {
        return j
      }
    }
    return -1
  }
  checkRowColumnDiagonals = (x) => {
    let connect4 = this.checkRowAndColumn(x) || this.checkLeftDiagonals(x) || this.checkRightDiagonals(x);
    console.log("connect4",connect4);
    this.checkWin(connect4);
  }
  checkRowAndColumn = (x) => {
    let currentUser = this.state.current;
    let y = this.getTopElement(x);
    let countByRow = 0, countByColumn = 0; let i = 0;
    while (i < this.state.board.length && countByRow < 4 && countByColumn < 4) {
      countByRow = (this.state.board[i][y] === currentUser) ? countByRow += 1 : countByRow = 0;
      countByColumn = (this.state.board[x][i] === currentUser) ? countByColumn += 1 : countByColumn = 0;
      i++
    }
    return (countByRow===4 || countByColumn===4) ? true : false;
  }
  
  checkLeftDiagonals = (x) => {
    let currentUser = this.state.current;
    let y = this.getTopElement(x),
      countByLeftDiagonal = 0,
      sumOfIndex = x + y,
      j = (sumOfIndex < ROW_BOARD - 1) ? sumOfIndex : ROW_BOARD - 1, //if out of board size change first index value to Max count of rows
      i = (sumOfIndex < ROW_BOARD - 1) ? 0 : sumOfIndex - j;        //if out of board size
    while ((j >= 0 && i <= COL_BOARD - 1) && countByLeftDiagonal < 4) {
      countByLeftDiagonal = (this.state.board[i][j] === currentUser) ? countByLeftDiagonal += 1 : countByLeftDiagonal = 0;
      i++; j--;
    }
    return (countByLeftDiagonal===4 ? true : false);
  }
  checkRightDiagonals = (x) => {
    // debugger;
    let currentUser = this.state.current;
    let y = this.getTopElement(x),
      countByRightDiagonal = 0,
      difOfIndex = x - y,
      i = (difOfIndex < 0) ? 0 : difOfIndex,         //if out of board size
      j = (difOfIndex < 0) ? -difOfIndex : 0;        //if out of board size
    while ((j <= ROW_BOARD - 1 && i <= COL_BOARD - 1) && countByRightDiagonal < 4) {
      countByRightDiagonal = (this.state.board[i][j] === currentUser) ? countByRightDiagonal += 1 : countByRightDiagonal = 0;
      console.log("i=", i, ' j=', j);
      i++; j++;
    }
    console.log("countByRightDiagonal", countByRightDiagonal)
   return (countByRightDiagonal===4 ? true : false)
  }

  clearBoard() {
    this.setState({
      board: [
        [], [], [], [], [], [], []  // 7 columns
      ]
    })
    this.createBoard()
  }

  checkWin(connect4) {
    if (connect4) {
      this.setState({ winMessage: true });
      // this.clearBoard()
    }
    else {
      this.toggleUser();
    }
  }
  createBoard = () => {
    const cells = [];
    for (let y = ROW_BOARD - 1; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < COL_BOARD; x++) {
        row.push(<GridCell
          board={this.state.board}
          tileColor={this.state.board[x][y]}
          sendTileDrop={this.sendTileDrop}
          checkRowColumnDiagonals={this.checkRowColumnDiagonals}
          key={x + y}
          x={x} 
          y={y}
        />)
      }
      cells.push(<div key={y} className="row">{row}</div>)
    }
    return cells
  }


  render() {
    return (
      <div className="App">

        <div> {(this.state.winMessage) ? `Win ${this.state.current}` : null}</div>
        {this.createBoard()}
      </div>
    );
  }
}

export default App;
