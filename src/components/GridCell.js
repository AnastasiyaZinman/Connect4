import React, { Component } from 'react';
class GridCell extends Component {
    constructor() {
        super();
        this.state = {
            hover: 1
        }
    }
    // Add new cell/tile of current player and check connect4 in Row, Column and Diagonals
    // also change hover value if cell/tile is clicked
    handleClick() {
        //can push new tile and change player's turn just if column is not full
        if (this.props.board[this.props.x][this.props.ROW_BOARD-1] === undefined) 
        {
            this.switchHover();
            this.props.pushTileDrop(this.props.x); //push new tile to array
            this.props.checkRowColumnDiagonals(this.props.x);  //, this.props.currentUser check row on 4 tiles if same color
            this.setState({ hover: -1 })
            this.props.pushOrPopHoverTile(this.props.x, 1)
        }
        else alert("this column is already full")
    }

    // switch hover and set state of hover-value depending on onMouse event
    switchHover = () => {
        let hover = - this.state.hover;
        this.setState({ hover: hover });
        this.props.pushOrPopHoverTile(this.props.x, this.state.hover)
    }
    render() {
        let cellClass = "cell ",
            x = this.props.x,
            y = this.props.y;
        cellClass = (this.props.board[x][y] !== undefined) ? cellClass + `${this.props.tileColor}` : cellClass;

        return (
            <div
                onMouseEnter={this.switchHover}
                onMouseLeave={this.switchHover}
                className={cellClass}
                onClick={() => this.handleClick()}>
            </div>)
    }
}
export default GridCell;