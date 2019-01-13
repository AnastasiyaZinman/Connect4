import React, { Component } from 'react';
class RestartForm extends Component {
  render() {
    let winnerName = "winner " + this.props.winner;
    return (
      <div className="restart-form">
        <p className={winnerName}>
          {(this.props.winner === this.props.player1) ? "player 1" : "player 2"}
          <span className="regular-text"> win! </span>
        </p>
        <div className="restart-button">
          <button onClick={this.props.clearBoard}>&#10004;</button>
        </div>
      </div>
    )
  }
}

export default RestartForm;

