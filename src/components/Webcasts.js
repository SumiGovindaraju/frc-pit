import React, { Component } from 'react';

export default class Webcasts extends Component {
  render() {
    return (
      <div className="webcasts">
        <h1 className="no-internet" style={{ display: "none" }}>Unable to Show Webcasts</h1>
        <h1 className="no-webcasts" style={{ display: "none" }}>No Webcasts</h1>
        <ul className="nav nav-tabs" role="tablist"></ul>
        <div className="tab-content"></div>
      </div>
    );
  }
}