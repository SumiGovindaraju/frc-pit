import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut().then(function () {
      window.location.href = process.env.PUBLIC_URL;
    }, function (error) {
      console.error(error);
    });
  }

  componentWillMount() { // create script tags
    var script = document.createElement("script");
    var scriptBody = document.createTextNode(`
      $(document).ready(function () {
        $(".settings").hide();
      });
    `);
    script.appendChild(scriptBody);
    document.body.appendChild(script);
  }

  render() {
    return (
      <h1 className="sign-out-header" style={{ textAlign: "center" }}>Signing you out now.</h1>
    );
  }
}