import React, { Component } from 'react';
class GridCell extends Component {
    handleClick() {
        console.log(`Clicked on column x ${this.props.x}`);
        console.log(`Clicked on row  y ${this.props.y}`);
        console.log("this.props.currentUser",this.props.currentUser);
        this.props.sendTileDrop(this.props.x); //push new tile to array
        this.props.checkRow(this.props.y, this.props.currentUser);     //check row on 4 tiles if same color
        // this.props.checkColumn(this.props.x, this.props.currentUser);  //check column on 4 tiles if same color
        // this.props.checkDiagonal1(this.props.x, this.props.currentUser); //check diagonal1 on 4 tiles if same color
        // this.props.checkDiagonal2(this.props.x, this.props.currentUser); //check diagonal2 on 4 tiles if same color
    }
render() {
    let cellClass = "cell "
    const board = this.props.board,
        x = this.props.x,
        y = this.props.y;
        if (board[x][y] !== undefined) {
            cellClass = cellClass + `${this.props.tileColor}`;
        }
    
    return(
    <div className={cellClass} onClick={() => this.handleClick()}>
     <p> {this.props.x}, {this.props.y}</p>
    </div>  )
}
}
export default GridCell;