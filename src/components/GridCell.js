import React, { Component } from 'react';
class GridCell extends Component {
    handleClick() {
        this.props.sendTileDrop(this.props.x); //push new tile to array
        this.props.checkRowColumnDiagonals(this.props.x);  //, this.props.currentUser check row on 4 tiles if same color
    }
render() {
    let cellClass = "cell ",
        x = this.props.x,
        y = this.props.y;
        cellClass = (this.props.board[x][y] !== undefined) ? cellClass + `${this.props.tileColor}`: cellClass;
            
    return(
    <div className={cellClass} onClick={() => this.handleClick()}>
     <p> {this.props.x}, {this.props.y}</p>
    </div>  )
}
}
export default GridCell;