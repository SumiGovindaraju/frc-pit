import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut().then(function() {
      window.location.href = "../frc-pit"
    }, function(error) {
      console.error(error);
    });
  }

  render() {
    return (
      <h1 className="sign-out-header" style={{ textAlign: "center" }}>Signing you out now.</h1>
    );
  }
}