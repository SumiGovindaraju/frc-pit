import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import pullFromTBA from './storage/api';

class App extends Component {
  componentDidMount() {
    pullFromTBA();

    setInterval(function () {
      pullFromTBA();
    }, 120000);
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
