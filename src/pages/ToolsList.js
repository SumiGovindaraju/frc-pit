import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ToolRow extends Component {
  constructor(props) {
    super(props);
    this.returnTool = this.returnTool.bind(this);
    this.state = { currentUser: null };

    var instance = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        instance.setState({ currentUser: user });
      } else {
        window.location.href = "../auth?redirect=" + encodeURIComponent(window.location.href);
      }
    });
  }

  returnTool(id) {
    if (this.state.currentUser != null) {
      var ref = firebase.database().ref('/users/' + this.state.currentUser.uid + '/tools').child(id);
      ref.remove();
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
    this.state = { shouldRender: false, tools: [], team_number: null };

    var instance = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        instance.setState({ currentUser: user });

        firebase.database().ref('/users/' + instance.state.currentUser.uid + '/tools').on('child_added', function(snapshot, prevChildKey) {
          var tools = instance.state.tools;
          var key = snapshot.key;
          var data = snapshot.val();

          tools.push({
            key: key,
            tool_name: data.tool_name,
            tool_team_number: data.tool_team_number,
            tool_check_out_time: data.tool_check_out_time,
            tool_description: data.tool_description
          });
    
          instance.setState({ tools: tools });
        });

        firebase.database().ref('/users/' + instance.state.currentUser.uid + '/tools').on('child_changed', function(snapshot) {
          var tools = instance.state.tools;
          var key = snapshot.key;
          var data = snapshot.val();

          for (var tool in tools) {
            if (tools[tool].key === key) {
              tools[tool] = {
                key: key,
                tool_name: data.tool_name,
                tool_team_number: data.tool_team_number,
                tool_check_out_time: data.tool_check_out_time,
                tool_description: data.tool_description
              };
            }
          }

          tools.push({
            key: key,
            tool_name: data.tool_name,
            tool_team_number: data.tool_team_number,
            tool_check_out_time: data.tool_check_out_time,
            tool_description: data.tool_description
          });
    
          instance.setState({ tools: tools });
        });

        firebase.database().ref('/users/' + instance.state.currentUser.uid + '/tools').on('child_removed', function(snapshot) {
          var tools = instance.state.tools;
          var key = snapshot.key;

          for (var tool in tools) {
            if (tools[tool].key === key) {
              delete tools[tool];
            }
          }
    
          instance.setState({ tools: tools });
        });

        firebase.database().ref('/users/' + instance.state.currentUser.uid).once("value", snapshot => {
          snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.key === "team") {
              instance.setState({ team_number: childSnapshot.val() });
            }
          });
        });

        instance.setState({ shouldRender: true });
      } else {
        window.location.href = "../auth?redirect=" + encodeURIComponent(window.location.href);
      }
    });
  }

  render() {
    if (this.state.shouldRender) {
      var rows = [];
      rows = this.state.tools.map((obj) => 
        <ToolRow key={obj.key} index={obj.key} name={obj.tool_name} team={obj.tool_team_number} time={obj.tool_check_out_time} tool={obj.tool_description} />
      );

      return (
        <div>
          <h2 style={{textAlign: "center"}}>{ this.state.team_number == null ? "Loading..." : "Tools Checked Out from Team " + this.state.team_number + ":"}</h2>
          <table className="table-striped table-bordered tools-list" style={{ width: "98%", maxWidth: "98%", margin: "1%" }}>
            <thead>
              <tr>
                <th>Name <i class="fas fa-sort"></i></th>
                <th>Team Number <i class="fas fa-sort"></i></th>
                <th>Checkout Date <i class="fas fa-sort"></i></th>
                <th>Tool <i class="fas fa-sort"></i></th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}