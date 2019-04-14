import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

var redirectURL = ((new RegExp('[?|&]redirect=([^&;]+?)(&|#|;|$)').exec(window.location.href) || [null, ''])[1].replace(/\+/g, '%20'));

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: false,
      uiConfig: {
        signInFlow: 'popup',
        signInSuccessUrl: process.env.PUBLIC_URL + `/#/signed_in?redirect=${redirectURL}`,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
              type: 'image',
              size: 'normal',
              badge: 'bottomleft'
            },
            defaultCountry: 'US'
          }
        ],
      }
    };

    var instance = this;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        window.location.href = process.env.PUBLIC_URL + `/#/signed_in?redirect=${redirectURL}`;
      } else {
        instance.setState({ shouldRender: true });
      }
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
    if (this.state.shouldRender) {
      return (
        <StyledFirebaseAuth uiConfig={this.state.uiConfig} firebaseAuth={firebase.auth()} />
      );
    } else {
      return null;
    }
  }
}