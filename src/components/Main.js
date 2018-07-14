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
      </main>
    );
  }
}