import React, { Component } from 'react';
class GridCell extends Component {
    handleClick() {
        console.log(`Clicked on column x ${this.props.x}`);
        console.log(`Clicked on row  y ${this.props.y}`);
        // console.log("this.props.currentUser",this.props.currentUser);
        this.props.sendTileDrop(this.props.x); //push new tile to array
        this.props.checkRow(this.props.x, this.props.currentUser);     //check row on 4 tiles if same color
        this.props.checkColumn(this.props.x, this.props.currentUser);  //check column on 4 tiles if same color
        // this.props.checkDiagonal1(this.props.x, this.props.currentUser); //check diagonal1 on 4 tiles if same color
        // this.props.checkDiagonal2(this.props.x, this.props.currentUser); //check diagonal2 on 4 tiles if same color
       this.props.toggleUser();
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