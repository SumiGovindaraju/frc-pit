import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import AppState from '../state/AppState';

class ToolRow extends Component {
  constructor(props) {
    super(props);

    this.returnTool = this.returnTool.bind(this);
    this.state = { currentUser: null };

    var instance = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        instance.setState({ currentUser: user });
      } else {
        window.location.href = process.env.PUBLIC_URL + "/#/auth?redirect=" + encodeURIComponent(window.location.href);
      }
    });
  }

  returnTool(id) {
    if (this.state.currentUser != null) {
      document.getElementsByClassName("error-alert-div")[0].style.display = "none";
      firebase.firestore().collection('users').doc(this.state.currentUser.uid).collection('tools').doc(id).delete();
    } else {
      alert("No current user");
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.team}</td>
        <td>{this.props.time}</td>
        <td>{this.props.tool}</td>
        <td><button type='button' className='btn btn-primary' onClick={() => this.returnTool(this.props.index)}>Return</button></td>
      </tr>
    );
  }
}

export default class ToolsList extends Component {
  constructor(props) {
    super(props);

    firebase.firestore().settings({ timestampsInSnapshots: true });

    this.state = { shouldRender: false, tools: [], team_number: null };

    var instance = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        instance.setState({ currentUser: user });

        firebase.firestore().collection('users').doc(instance.state.currentUser.uid).collection('tools').onSnapshot(querySnapshot => {
          var tools = [];

          for (var i in querySnapshot.docs) {
            tools.push({
              key: querySnapshot.docs[i].id,
              name: querySnapshot.docs[i].get('name'),
              team_number: querySnapshot.docs[i].get('team_number'),
              checkout_time: querySnapshot.docs[i].get('checkout_time').toDate().toLocaleString(),
              description: querySnapshot.docs[i].get('description')
            });
          }

          instance.setState({ tools: tools });
        }, err => {
          console.error(err)
        });

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

  render() {
    if (this.state.shouldRender) {
      var rows = [];
      rows = this.state.tools.map(({ key, name, team_number, checkout_time, description }) =>
        <ToolRow key={key} index={key} name={name} team={team_number} time={checkout_time} tool={description} />
      );

      return (
        <div>
          <h2 style={{ textAlign: "center" }}>{this.state.team_number == null ? "Loading..." : "Tools Checked Out from Team " + this.state.team_number + ":"}</h2>
          <table className="table-striped table-bordered tools-list" style={{ width: "98%", maxWidth: "98%", margin: "1%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Team Number</th>
                <th>Checkout Date</th>
                <th>Tool</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}