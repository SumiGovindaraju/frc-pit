import React, { Component } from 'react';

export default class Awards extends Component {
  render() {
    return (
      <div className="awards">
        <h1 className="no-awards" style={{ display: "none" }}>No Awards</h1>
        <h1>Awards</h1>
        <ul></ul>
      </div>
    );
  }
}