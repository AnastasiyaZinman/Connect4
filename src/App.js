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
      ]
    }
  }
  sendTileDrop = (x) => {
    console.log("tileDrop, ", x);
    let board = [...this.state.board];
    board[x].push(this.state.current);
    this.setState(board)
    this.toggleUser();
  }
  toggleUser = () => {
    this.state.current = this.state.current === "green" ? "blue" : "green"
  }
  checkRow = (y, currentUser) => {
    let count = 0; let i = 0;
    while (i < this.state.board.length && count < 4) {
      if (this.state.board[i][y] === currentUser) {
        count += 1;
      }
      else {
        count = 0;
      }
      i++
      }
    if (count == 4) {
      alert(`Player ${currentUser} won!`)
      // this.clearBoard()
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
          currentUser={this.state.current}
          sendTileDrop={this.sendTileDrop}
          key={x + y}
          x={x}
          y={y}
          checkRow={this.checkRow}
        />)
      }
      cells.push(<div key={y} className="row">{row}</div>)
    }
    return cells
  }


  render() {
    return (
      <div className="App">
        {this.createBoard()}
      </div>
    );
  }
}

export default App;
