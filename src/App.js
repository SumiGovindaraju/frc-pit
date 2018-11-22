import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router history={createHistory({ basename: process.env.PUBLIC_URL })}>
          <Main />
        </Router>
      </div>
    );
  }
}

export default App;
