import React, { Component } from 'react';
import GridCell from './components/GridCell';
import RestartForm from './components/RestartForm';
import './App.css';
const COL_BOARD = 7,
      ROW_BOARD = 6,
      PLAYER_1 = "red",
      PLAYER_2 = "blue",
      POSSIBLE_TILE_POSITION = "yellow"
class App extends Component {
  constructor() {
    super();
    this.state = {
      current: PLAYER_1,            //first player, also can be blue
      board: [
        [], [], [], [], [], [], []  // 7 columns
      ],
      winMessage: false
    }
  }
  //add new tile to x-column of the board
  pushTileDrop = (x) => {
    let board = [...this.state.board];
    board[x].push(this.state.current);
    this.setState(board)
  }
  //push or pop possible tile position
  pushOrPopHoverTile = (x, hover) => {
    let board = [...this.state.board];
    if (hover !== -1) {
      board[x].push(POSSIBLE_TILE_POSITION)
    }
    else {
      board[x].pop();
    }
    this.setState(board)
  }
 // Change user turn
  toggleUser = () => {
    let current = this.state.current === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    this.setState({ current: current });
  }
  //get index of the top tile in the x-column, return j-index of current tile
  getTopElement = (x) => {
    return this.state.board[x].length-1
  }
  // Function checks win of current player in Row, Column and Diagonals,
  //  which include clicked tile. Return true (connect4) if Win
  checkRowColumnDiagonals = (x) => {
    let connect4 = this.checkRowAndColumn(x) || this.checkLeftDiagonals(x) || this.checkRightDiagonals(x);
    this.checkWin(connect4);
  }
  // Function checks win in Row and Column, which include clicked tile
  // if connect 4  return true, otherwise - false 
  checkRowAndColumn = (x) => {
    let currentUser = this.state.current;
    let y = this.getTopElement(x);
    let countByRow = 0, countByColumn = 0; let i = 0;
    while (i < this.state.board.length && (countByRow < 4) && (countByColumn < 4)) {
      countByRow = (this.state.board[i][y] === currentUser) ? countByRow += 1 : countByRow = 0;
      countByColumn = (this.state.board[x][i] === currentUser) ? countByColumn += 1 : countByColumn = 0;
      i++
    }
    return (countByRow === 4 || countByColumn === 4) ? true : false;
  }
   // Function checks win in Left Diagonal, which include clicked tile
   // if connect 4  return true, otherwise - false 
   // Checking from left to right, from top to bottom
  checkLeftDiagonals = (x) => {
    let currentUser = this.state.current;
    let y = this.getTopElement(x),
      counterByLeftDiagonal = 0,
      sumOfIndex = x + y,         // sum of indexes of cell in left diagonal always same
      j = (sumOfIndex < ROW_BOARD - 1) ? sumOfIndex : ROW_BOARD - 1, //if out of board size change first index value to Max number of rows
      i = (sumOfIndex < ROW_BOARD - 1) ? 0 : sumOfIndex - j;         //if out of board size
    while ((j >= 0 && i <= COL_BOARD - 1) && counterByLeftDiagonal < 4) {
      counterByLeftDiagonal = (this.state.board[i][j] === currentUser) ? counterByLeftDiagonal += 1 : counterByLeftDiagonal = 0;
      i++; j--;
    }
    return (counterByLeftDiagonal === 4 ? true : false);
  }
  // Function checks win in Right Diagonal, which include clicked tile
   // if connect 4  return true, otherwise - false 
   // Checking from bottom to top, from right to left
  checkRightDiagonals = (x) => {
    let currentUser = this.state.current;
    let y = this.getTopElement(x),
      counterByRightDiagonal = 0,
      difOfIndex = x - y,           // difference between indexes of cell in right diagonal always same
      i = (difOfIndex < 0) ? 0 : difOfIndex,         //if out of board size
      j = (difOfIndex < 0) ? - difOfIndex : 0;        //if out of board size
    while ((j <= ROW_BOARD - 1 && i <= COL_BOARD - 1) && counterByRightDiagonal < 4) {
      counterByRightDiagonal = (this.state.board[i][j] === currentUser) ? counterByRightDiagonal += 1 : counterByRightDiagonal = 0;
      i++; j++;
    }
    return (counterByRightDiagonal === 4 ? true : false)
  }
  // Check win, if true - get PopUp-form, false - change turn of player
  checkWin(connect4) {
    if (connect4) {
      this.setState({ winMessage: true });
    }
    else {
      this.toggleUser();
    }
  }
  // Clear board, Set first properties for new game
  clearBoard = () => {
    this.setState({winMessage:false, current: PLAYER_1})
    this.setState({
      board: [
        [], [], [], [], [], [], []  // 7 columns
      ]
    })
    this.createBoard()
  }
// Create board 7x6
  createBoard = () => {
    const cells = [];
    for (let y = ROW_BOARD - 1; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < COL_BOARD; x++) {
        row.push(<GridCell
          board={this.state.board}
          tileColor={this.state.board[x][y]}
          pushTileDrop={this.pushTileDrop}
          checkRowColumnDiagonals={this.checkRowColumnDiagonals}
          pushOrPopHoverTile={this.pushOrPopHoverTile}
          ROW_BOARD = {ROW_BOARD}
          possiblePosColor = {POSSIBLE_TILE_POSITION}
          x={x}
          y={y}
          key={x + y}
        />)
      }
      cells.push(<div key={y} className="row">{row}</div>);
    }
    return cells
  }
 
  render() {
    let player= "player-box " + this.state.current;
    return (
      <div className="App">
        <div className={player}>{(this.state.current===PLAYER_1) ? "PLAYER 1": "PLAYER 2"}</div>
        <div className="pop-win"> {(this.state.winMessage) ? 
        <RestartForm winner={this.state.current} player1={PLAYER_1} clearBoard={this.clearBoard}/> 
        : null}</div>
        <div className="board">{this.createBoard()}</div>
      </div>
    );
  }
}

export default App;
