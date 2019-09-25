import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import api from './storage/api';

class App extends Component {
  componentDidMount() {
    api.pullFromTBA();

    setInterval(function () {
      api.pullFromTBA();
    }, 120000);

    var isOnline = navigator.onLine;
    setInterval(function () {
      if (navigator.onLine && !isOnline) {
        api.pullFromTBA();
      }

      isOnline = navigator.onLine;
    }, 100);
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
