import React, { Component } from 'react';
class GridCell extends Component {
    constructor() {
        super();
        this.state = {
            hover: 1,
            hoverColor: " yellow",
        }
    }

    handleClick() {
        if (this.props.board[this.props.x][this.props.ROW_BOARD] === undefined) //can push new tile and change player's turn just if column is not full
        {
            this.switchHover();
            this.props.pushTileDrop(this.props.x); //push new tile to array
            this.props.checkRowColumnDiagonals(this.props.x);  //, this.props.currentUser check row on 4 tiles if same color
            this.setState({ hover: -1 })
            this.props.pushOrPopHoverTile(this.props.x, 1)
        }
        else alert("this column is already full")
    }
    switchHover = () => {
        console.log("switch", this.state.hover)
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