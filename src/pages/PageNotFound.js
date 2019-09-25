import React, { Component } from 'react';
import AppState from '../state/AppState';

export default class PageNotFound extends Component {
  constructor(props) {
    super(props);

    AppState.getInstance().setShowSettingsPane(false);
    AppState.getInstance().setShowOtherSettings(false);
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "1%" }}>404 Page Not Found:</h1>
        <h3 style={{ textAlign: "center", marginTop: "1%" }}>This Page Does Not Exist</h3>
      </div>
    );
  }
}