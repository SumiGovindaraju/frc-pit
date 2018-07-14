import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

var redirectURL = ((new RegExp('[?|&]redirect=([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || "../frc-pit";

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: false,
      uiConfig: {
        signInFlow: 'popup',
        signInSuccessUrl: `/frc-pit/signed_in?redirect=${redirectURL}`,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
              type: 'image',
              size: 'normal',
              badge: 'bottomleft'
            },
            defaultCountry: 'US', // Set default country to the United Kingdom (+44).
          }
        ],

        credentialHelper: firebaseui.auth.CredentialHelper.NONE
      }
    };
    
    var instance = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location.href = `../frc-pit/signed_in?redirect=${redirectURL}`;
      } else {
        instance.setState({ shouldRender: true });
      }
    });
  }
  
  render() {
    if (this.state.shouldRender) {
      return (
        <StyledFirebaseAuth uiConfig={this.state.uiConfig} firebaseAuth={firebase.auth()}/>
      );
    } else {
      return null;
    }
  }
}