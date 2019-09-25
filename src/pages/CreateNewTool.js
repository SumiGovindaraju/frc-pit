import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import AppState from '../state/AppState';

export default class CreateNewTool extends Component {
  constructor(props) {
    super(props);

    firebase.firestore().settings({ timestampsInSnapshots: true });

    this.addTool = this.addTool.bind(this);
    this.state = { shouldRender: false, currentUser: null };

    var instance = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        instance.setState({ currentUser: user });

        firebase.firestore().collection('users').doc(instance.state.currentUser.uid).get().then((doc) => {
          instance.setState({ team_number: doc.get('team') });
        });

        instance.setState({ shouldRender: true });
      } else {
        window.location.href = process.env.PUBLIC_URL + "/#/auth?redirect=" + encodeURIComponent(window.location.href);
      }
    });

    AppState.getInstance().setShowSettingsPane(false);
    AppState.getInstance().setShowOtherSettings(false);
  }

  addTool() {
    var name = document.getElementById("name").value,
      tool = document.getElementById("tool").value,
      team_number = document.getElementById("team-number").value;

    if (name === "" || tool === "" || team_number === "") {
      alert("Error: All fields must be filled.");
      return;
    }

    if (this.state.currentUser != null) {
      firebase.firestore().collection('users').doc(this.state.currentUser.uid).collection('tools').add({
        "name": name,
        "description": tool,
        "checkout_time": new Date(),
        "team_number": parseInt(team_number, 10)
      });

      document.getElementById("name").value = "";
      document.getElementById("tool").value = "";
      document.getElementById("team-number").value = "";
      document.getElementsByClassName("error-alert-div")[0].style.display = "none";
    } else {
      alert("No current user");
    }
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>{this.state.team_number == null ? "Loading..." : "Check Out Tool from Team " + this.state.team_number + ":"}</h2>
          <form className="add-tool-container" style={{ width: "98%", margin: "1%" }}>
            <p>Name:</p><input className="form-control" id="name" placeholder="Name" type="text" />
            <p>Tool:</p><input className="form-control" id="tool" placeholder="Tool" type="text" />
            <p>Team Number:</p><input className="form-control" id="team-number" placeholder="Team Number" type="number" />
            <div className="btn btn-primary add-tool-btn" onClick={this.addTool}>Add Tool</div>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}