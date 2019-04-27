import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import AppState from '../state/AppState';
import Cache from '../storage/Cache';

export default class Header extends Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(function (user) {
      if (user && user.displayName) {
        var li = document.createElement("li");
        li.classList.add("nav-item");

        var a = document.createElement("a");
        a.classList.add("nav-link");
        a.classList.add("sign-out");
        a.innerHTML = "Sign out " + user.displayName;
        a.href = process.env.PUBLIC_URL + "/#/sign_out";

        li.appendChild(a);
        document.getElementsByClassName("sign-out-ul")[0].appendChild(li);
      }
    });

    var instance = this;
    AppState.getInstance().getEventEmitter().on("appStateChanged", function () {
      instance.forceUpdate();
    });

    this.setTeamNumberAndEvent = this.setTeamNumberAndEvent.bind(this);
    this.toggleWebcast = this.toggleWebcast.bind(this);
  }

  setTeamNumberAndEvent() {
    var event = document.getElementsByClassName("settings-event")[0].value;
    if (!event) {
      alert("Event field is required");
      return;
    }

    var team = document.getElementsByClassName("settings-team")[0].value === "" ? false : "frc" + document.getElementsByClassName("settings-team")[0].value;
    var showWebcast = AppState.getInstance().getShowWebcasts();
    window.location.href = window.location.href.split("?")[0] + "?event=" + event + (team ? "&team=" + team : "") + "&showWebcasts=" + showWebcast;
    window.location.reload();
  }

  toggleWebcast() {
    var event = AppState.getInstance().getEvent();
    var team = AppState.getInstance().getTeam();
    var showWebcast = AppState.getInstance().getShowWebcasts();
    window.location.href = window.location.href.split("?")[0] + "?event=" + event + (team ? "&team=" + team : "") + "&showWebcasts=" + !showWebcast;
    window.location.reload();
  }

  render() {
    var showSettings = AppState.getInstance().getShowSettingsPane();
    var showTeamSettings = AppState.getInstance().getShowOtherSettings();
    var event = AppState.getInstance().getEvent();
    var cache = Cache.getInstance().get();

    var eventOptions = [];
    if (cache.events !== undefined || cache.events.list !== undefined || cache.events.list.length !== 0) {
      var data = cache.events.list;
      for (var i in data) {
        eventOptions.push(<option key={data[i].key} value={data[i].key} selected={event && event === data[i].key}>{data[i].name} ({data[i].key})</option>);
      }
    }

    if (eventOptions.length === 0) {
      eventOptions.push(<option disabled>No Upcoming Events</option>);
    }

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href={process.env.PUBLIC_URL}>FRC Pit</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL}><i className="fa fa-home" aria-hidden="true"></i> Home</a></li>
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL + "/#/tools_list"}><i className="fa fa-wrench" aria-hidden="true"></i> Tools List</a></li>
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL + "/#/check_out_tool"}><i className="fa fa-plus" aria-hidden="true"></i> Check Out Tool</a></li>
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL + "/#/stats"}><i className="fa fa-chart-area" aria-hidden="true"></i> Stats</a></li>
            </ul>
            <form className="form-inline settings">
              <select className="form-control mr-sm-2 settings-event" style={{ display: showSettings ? "block" : "none" }}>{eventOptions}</select>
              <input className="form-control mr-sm-2 settings-team" placeholder="Team Number" type="number" style={{ display: showTeamSettings ? "block" : "none" }} />
              <input type="button" className="btn btn-success set-team-number-and-event-btn my-2 my-sm-0" value="✓" onClick={this.setTeamNumberAndEvent} style={{ display: showSettings ? "block" : "none" }} />
              <input type="button" className="btn btn-secondary disable-webcast-button my-2 my-sm-0" value="Toggle Webcasts" style={{ display: showTeamSettings ? "block" : "none", marginLeft: "5px" }} onClick={this.toggleWebcast} />
            </form>
            <ul className="navbar-nav ml-auto sign-out-ul"></ul>
          </div>
        </nav>
      </header>
    );
  }
}