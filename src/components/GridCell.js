import React, { Component } from 'react';
class GridCell extends Component {
    constructor() {
        super();
        this.state = {
            hover: 1, 
            hoverColor: " yellow"
        }
    }

    handleClick() {
      
        // console.log("onclick",this.state.hover); 
        //  console.log("this.state.board ",this.props.board[this.props.x])
        this.switchHover();
        this.props.pushTileDrop(this.props.x); //push new tile to array
        this.props.checkRowColumnDiagonals(this.props.x);  //, this.props.currentUser check row on 4 tiles if same color
       
        this.setState({hover:-1}) 
         this.props.pushOrPopHoverTile(this.props.x,1) 
       
    }
    switchHover = () => {
      
        let hover = - this.state.hover;
        this.setState({hover: hover}); 
        this.props.pushOrPopHoverTile(this.props.x,this.state.hover)   
    }
 
render() {
    let cellClass = "cell ",
        x = this.props.x,
        y = this.props.y;
        cellClass = (this.props.board[x][y] !== undefined) ? cellClass + `${this.props.tileColor}`: cellClass;
            
    return(
    <div 
    onMouseEnter={this.switchHover} 
    onMouseLeave={this.switchHover}
    className= {cellClass} 
    onClick={() => this.handleClick()}>
     {/* <p> {this.props.x}, {this.props.y}</p> */}
    </div>  )
}
}
export default GridCell;