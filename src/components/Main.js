import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from '../routes.js'

export default class Main extends Component {
  render() {
    var routesJSX = [];
    routesJSX = routes.map(({ path, component, exact }, i) =>
      <Route key={i} exact={exact} path={path} component={component} />
    );

    return (
      <main role="main">
        <HashRouter basename={process.env.PUBLIC_URL} hashType={"slash"}>
          <Switch>
            {routesJSX}
          </Switch>
        </HashRouter>
        <div className="error-alert-div" style={{ display: "none" }}><div className="btn btn-danger btn-lg error-alert"></div></div>
      </main>
    );
  }
}