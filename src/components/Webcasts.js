import React, { Component } from 'react';

export default class Webcasts extends Component {
  render() {
    return (
      <div className="webcasts">
        <h1 className="no-webcasts" style={{display: "none"}}>No Twitch Streams</h1>
        <ul className="nav nav-tabs" role="tablist"></ul>
        <div className="tab-content"></div>
      </div>
    );
  }
}