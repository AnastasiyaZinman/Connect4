import React, { Component } from 'react';

class RestartForm extends Component {
  restartGame = () => {
  
  }

  render() {
    let winnerName="winner-name " + this.props.winner;
    console.log("win");
  return (
  <div className="restart-form">   
  <p className = {winnerName}> {this.props.winner} win!</p>
    <div className="restart-button">
        <button onClick={this.props.clearBoard}>&#10004;</button>
    </div>
  </div>
  )
  }
}

export default RestartForm;

