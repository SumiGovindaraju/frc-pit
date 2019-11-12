import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
        <div className="footer">
          <p>Copyright (c) 2018-{(new Date()).getFullYear()} <a target="_blank" href="https://sumigovindaraju.github.io/" rel="noopener noreferrer">SumiGovindaraju</a>. Powered by <a target="_blank" href="https://reactjs.org/" rel="noopener noreferrer">React</a>, <a target="_blank" href="https://www.thebluealliance.com/" rel="noopener noreferrer">The Blue Alliance</a>, <a target="_blank" href="https://firebase.google.com/" rel="noopener noreferrer">Firebase</a>, and <a target="_blank" href="https://pages.github.com/" rel="noopener noreferrer">GitHub Pages</a>.</p>
        </div>
    );
  }
}