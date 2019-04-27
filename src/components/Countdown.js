import React, { Component } from 'react';
import Cache from '../storage/Cache';
import AppState from '../state/AppState';
import util from '../util';

export default class Countdown extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    Cache.getInstance().getEventEmitter().on("dataChanged", function () {
      instance.forceUpdate();
    });

    this.state = { nextMatchNameTime: null, nextMatchName: null, nextMatchBumperColor: "black" };
    this.updateCountdown = this.updateCountdown.bind(this);
    setInterval(this.updateCountdown, 1000);
  }

  updateCountdown() {
    var team = AppState.getInstance().getTeam();
    var event = AppState.getInstance().getEvent();
    var cache = Cache.getInstance().get();

    var closestMatchTime = Number.MAX_VALUE;
    var closestMatchName = null;
    var closestMatchBumperColor = null;

    if ((cache.events[event] == null || cache.events[event].matches == null || cache.events[event].matches.length === 0)
      || (team && (cache.events[event].teams[team] == null || cache.events[event].teams[team].matches == null || cache.events[event].teams[team].matches.length === 0))) {
      return;
    }

    var data = team ? cache.events[event].teams[team].matches : cache.events[event].matches;
    for (var match in data) {
      if ((new Date()) < (new Date(util.getMatchTimeInMS(data[match]))) && util.getMatchTimeInMS(data[match]) < closestMatchTime) {
        closestMatchTime = util.getMatchTimeInMS(data[match]);
        closestMatchName = data[match].comp_level === "qm" ? "Quals " + data[match].match_number : (data[match].comp_level === "qf" ? "Quarters " + data[match].set_number + " Match " + data[match].match_number : (data[match].comp_level === "sf" ? "Semis " + data[match].set_number + " Match " + data[match].match_number : "Finals " + data[match].match_number));
        closestMatchBumperColor = team ? (data[match].alliances.blue.team_keys.includes(team) ? "blue" : "red") : null
      }
    }

    if (closestMatchTime === Number.MAX_VALUE || closestMatchName === null) {
      this.setState({ nextMatchNameTime: null, nextMatchName: null, nextMatchBumperColor: "black" });
    } else {
      var countDownDate = new Date(closestMatchTime).getTime();

      var distance = countDownDate - (new Date());

      var hours = parseInt((distance / (1000 * 60 * 60)) % 24);
      var minutes = parseInt((distance / (1000 * 60)) % 60);
      var seconds = parseInt((distance / 1000) % 60);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      if (distance >= 0) {
        this.setState({ nextMatchNameTime: hours + ":" + minutes + ":" + seconds, nextMatchName: closestMatchName, nextMatchBumperColor: closestMatchBumperColor });
      } else {
        this.setState({ nextMatchNameTime: null, nextMatchName: null, nextMatchBumperColor: "black" });
      }
    }
  }

  render() {
    var body;
    if (this.state.nextMatchNameTime === null || this.state.nextMatchName === null) {
      body = <h1>No Upcoming Match</h1>;
    } else {
      body =
        <div>
          <h1 className={`countdown-timer-tag ${"countdown-" + this.state.nextMatchBumperColor}`} style={{ textAlign: "center", fontSize: "5.25em" }}>{this.state.nextMatchNameTime}</h1>;
          <h2 style={{ textAlign: "center" }}>Until {this.state.nextMatchName}</h2>
        </div>
    }

    return (
      <div className="countdown">
        {body}
      </div>
    );
  }
}