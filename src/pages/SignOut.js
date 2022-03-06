import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AppState from '../state/AppState';

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut().then(function () {
      window.location.href = process.env.PUBLIC_URL;
    }, function (error) {
      console.error(error);
    });

    AppState.getInstance().setShowSettingsPane(false);
    AppState.getInstance().setShowOtherSettings(false);
  }

  render() {
    return (
      <h1 className="sign-out-header" style={{ textAlign: "center" }}>Signing you out now.</h1>
    );
  }
}