import React, { Component } from 'react';

export default class Countdown extends Component {
  render() {
    return (
      <div className="countdown">
        <h1 className="no-countdown" style={{ display: "none" }}>No Match Coming Up</h1>
        <h1 className="countdown-timer-tag" style={{ textAlign: "center", fontSize: "5.25em" }}>&nbsp;</h1>
        <h2 style={{ textAlign: "center" }}>Until </h2>
      </div>
    );
  }
}