import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
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
        alert("FRC Pit is online. Refreshing cached data now", false);
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
        <Footer />
      </div>
    );
  }
}

export default App;
