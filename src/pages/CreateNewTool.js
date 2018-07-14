import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

export default class CreateNewTool extends Component {
  constructor(props) {
    super(props);
    this.addTool = this.addTool.bind(this);
    this.state = { shouldRender: false, currentUser: null };

    var instance = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        instance.setState({ currentUser: user });

        firebase.database().ref('/users/' + instance.state.currentUser.uid).once("value", snapshot => {
          snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.key === "team") {
              instance.setState({ team_number: childSnapshot.val() });
            }
          });
        });

        instance.setState({ shouldRender: true });
      } else {
        window.location.href = "../frc-pit/auth?redirect=" + encodeURIComponent(window.location.href);
      }
    });
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
      firebase.database().ref('/users/' + this.state.currentUser.uid + '/tools').push().set({
          "tool_name": name,
          "tool_check_out_time": (new Date()).toLocaleString(),
          "tool_description": tool,
          "tool_team_number": team_number
      });

      document.getElementById("name").value = "";
      document.getElementById("tool").value = "";
      document.getElementById("team-number").value = "";
    } else {
      alert("No current user");
    }
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <div>
          <h2 style={{textAlign: "center"}}>{ this.state.team_number == null ? "Loading..." : "Check Out Tool from Team " + this.state.team_number + ":"}</h2>
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