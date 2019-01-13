import React, { Component } from 'react';
class GridCell extends Component {
    // Add new cell/tile of current player and check connect4 in Row, Column and Diagonals
    handleClick() {
        //can push new tile and change player's turn just if column is not full
        if (this.props.board[this.props.x][this.props.ROW_BOARD-1] === undefined) 
        {
            this.props.pushTileDrop(this.props.x); //push new tile to array
            this.props.checkRowColumnDiagonals(this.props.x);  //, this.props.currentUser check row on 4 tiles if same color
        }
        else alert("this column is already full")
    }

    render() {
        let cellClass = "cell ",
            x = this.props.x,
            y = this.props.y;
        cellClass = (this.props.board[x][y] !== undefined) ? cellClass + `${this.props.tileColor}` : cellClass;

        return (
            <div
                className={cellClass}
                onClick={() => this.handleClick()}>
            </div>)
    }
}
export default GridCell;