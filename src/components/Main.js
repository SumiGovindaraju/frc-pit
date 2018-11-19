import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes.js'

export default class Main extends Component {
  render() {
    return (
      <main role="main">
        <Switch>
          {routes.map(({path, component, exact}, i) =>
            <Route key={i} exact={exact} path={path} component={component} />
          )}
        </Switch>
        <div className="error-alert-div" style={{ display: "none" }}><div className="btn btn-danger btn-lg error-alert"></div></div>
      </main>
    );
  }
}