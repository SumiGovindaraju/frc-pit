import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var redirectURL = decodeURIComponent(((new RegExp('[?|&]redirect=([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || process.env.PUBLIC_URL);

export default class SignedIn extends Component {
  constructor(props) {
    super(props);

    firebase.firestore().settings({timestampsInSnapshots: true});

    this.createUser = this.createUser.bind(this);
    this.state = { shouldRender: false, currentUser: null };

    var instance = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
          if (doc.exists) {
            window.location.href = redirectURL;
          } else {
            instance.setState({ currentUser: user });
            instance.setState({ shouldRender: true });
          }
        });
      } else {
        window.location.href = process.env.PUBLIC_URL + "/auth?redirect=" + encodeURIComponent("signed_in");
      }
    });
  }

  createUser() {
    var full_name = document.getElementById("full-name").value !== "" ? document.getElementById("full-name").value : this.state.currentUser.displayName;
    var team_number = document.getElementById("team-number").value;

    if (full_name === "" || full_name === null || team_number === "") {
      alert("Error: All fields must be filled.");
      return;
    }

    document.getElementsByClassName("error-alert-div")[0].style.display = "none";
    if (this.state.currentUser != null) {
      firebase.firestore().collection('users').doc(this.state.currentUser.uid).set({
        "name": full_name,
        "team": team_number
      });

      this.state.currentUser.updateProfile({
        displayName: full_name
      }).then(function() {
        window.location.href = redirectURL;
      }).catch(function(error) {
        console.error(error);
      });
    }
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <div>
          <form className="add-tool-container" style={{ width: "98%", margin: "1%" }}>
            <p>Full Name:</p><input className="form-control" id="full-name" placeholder={ this.state.currentUser.displayName == null ? "Full name" : this.state.currentUser.displayName } type="text" />
            <p>Team Number:</p><input className="form-control" id="team-number" placeholder="Team Number" type="number" />
            <div className="btn btn-primary add-tool-btn" onClick={this.createUser}>Create User</div>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}