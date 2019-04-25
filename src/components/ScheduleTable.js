import React, { Component } from 'react';
import Cache from '../storage/Cache';
import AppState from '../state/AppState';
const util = require('./../util');

export default class ScheduleTable extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    Cache.getInstance().getEventEmitter().on("dataChanged", function () {
      instance.forceUpdate();
    });
  }

  componentDidMount() {
    this.sortSchedule();
  }

  render() {
    var team = AppState.getInstance().getTeam();
    var event = AppState.getInstance().getEvent();
    var cache = Cache.getInstance().get();

    var body;
    if ((cache.events[event] === undefined || cache.events[event].matches === undefined || cache.events[event].matches.length === 0)
      || (team && (cache.events[event].teams[team] === undefined || cache.events[event].teams[team].matches === undefined || cache.events[event].teams[team].matches.length === 0))) {
      body = <h1 className="no-schedule">No Schedule</h1>;
    } else {
      var data = team ? cache.events[event].teams[team].matches : cache.events[event].matches;

      var rows = [];
      for (var match in data) {
        if (!team || (data[match].alliances.red.team_keys.includes(team.toString()) || data[match].alliances.blue.team_keys.includes(team.toString()))) {
          var scores;
          if (data[match].alliances.red.score >= 0 && data[match].alliances.blue.score >= 0) {
            scores = <React.Fragment>
              <td className={`red-score ${data[match].winning_alliance === "red" ? "winner" : ""} ${data[match].alliances.red.team_keys.includes(team) ? "current-team" : ""}`} data-toggle="tooltip" data-placement="top" title={`${data[match].score_breakdown.red.completeRocketRankingPoint ? "Complete Rocket" : ""}${data[match].score_breakdown.red.completeRocketRankingPoint && data[match].score_breakdown.red.habDockingRankingPoint ? " & " : ""}${data[match].score_breakdown.red.habDockingRankingPoint ? "HAB Docking" : ""}`}>{data[match].alliances.red.score}</td>
              <td className={`blue-score ${data[match].winning_alliance === "blue" ? "winner" : ""} ${data[match].alliances.blue.team_keys.includes(team) ? "current-team" : ""}`} data-toggle="tooltip" data-placement="top" title={`${data[match].score_breakdown.blue.completeRocketRankingPoint ? "Complete Rocket" : ""}${data[match].score_breakdown.blue.completeRocketRankingPoint && data[match].score_breakdown.blue.habDockingRankingPoint ? " & " : ""}${data[match].score_breakdown.blue.habDockingRankingPoint ? "HAB Docking" : ""}`}>{data[match].alliances.blue.score}</td>
            </React.Fragment>
          } else {
            var matchDate = new Date(util.getMatchTimeInMS(data[match]));
            scores =
              <td colSpan="2"><time dateTime={matchDate.toISOString()}>{util.days[matchDate.getDay()]}, {matchDate.toLocaleTimeString().replace(/:\d{2}\s/, ' ')}</time></td>
          }

          rows.push(
            <tr key={match}>
              <td>{data[match].comp_level === "qm" ? "Quals " + data[match].match_number : (data[match].comp_level === "qf" ? "Quarters " + data[match].set_number + " Match " + data[match].match_number : (data[match].comp_level === "sf" ? "Semis " + data[match].set_number + " Match " + data[match].match_number : "Finals " + data[match].match_number))}</td>
              <td className={`red ${data[match].alliances.red.team_keys[0] === team ? "current-team" : ""} ${data[match].alliances.red.dq_team_keys.includes(data[match].alliances.red.team_keys[0]) ? "strike" : ""}`}>{data[match].alliances.red.team_keys[0].substring(3)}</td>
              <td className={`red ${data[match].alliances.red.team_keys[1] === team ? "current-team" : ""} ${data[match].alliances.red.dq_team_keys.includes(data[match].alliances.red.team_keys[1]) ? "strike" : ""}`}>{data[match].alliances.red.team_keys[1].substring(3)}</td>
              <td className={`red ${data[match].alliances.red.team_keys[2] === team ? "current-team" : ""} ${data[match].alliances.red.dq_team_keys.includes(data[match].alliances.red.team_keys[2]) ? "strike" : ""}`}>{data[match].alliances.red.team_keys[2].substring(3)}</td>
              <td className={`blue ${data[match].alliances.blue.team_keys[0] === team ? "current-team" : ""} ${data[match].alliances.blue.dq_team_keys.includes(data[match].alliances.blue.team_keys[0]) ? "strike" : ""}`}>{data[match].alliances.blue.team_keys[0].substring(3)}</td>
              <td className={`blue ${data[match].alliances.blue.team_keys[1] === team ? "current-team" : ""} ${data[match].alliances.blue.dq_team_keys.includes(data[match].alliances.blue.team_keys[1]) ? "strike" : ""}`}>{data[match].alliances.blue.team_keys[1].substring(3)}</td>
              <td className={`blue ${data[match].alliances.blue.team_keys[2] === team ? "current-team" : ""} ${data[match].alliances.blue.dq_team_keys.includes(data[match].alliances.blue.team_keys[2]) ? "strike" : ""}`}>{data[match].alliances.blue.team_keys[2].substring(3)}</td>
              {scores}
            </tr>);
        }
      }

      body = <table className="table table-bordered" id="schedule-table">
        <thead>
          <tr>
            <th>Match</th>
            <th colSpan="3">Red Alliance</th>
            <th colSpan="3">Blue Alliance</th>
            <th colSpan="2">Scores</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>;
    }

    return (
      <div className="tab-pane fade show active schedule" id="schedule" role="tabpanel">
        {body}
      </div>
    );
  }

  // adapted from w3 schools
  sortSchedule() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("schedule-table");
    if (table === null) {
      return;
    }

    switching = true;

    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("tr");

      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];

        if (this.sortScheduleCompare(x.innerHTML, y.innerHTML) === 1) {
          shouldSwitch = true;
          break;
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  // returns 1 if a is a later match than b, 0 if a is the same match as b, and -1 if a is an earlier match than b
  sortScheduleCompare(a, b) {
    var aType, bType;
    // Quals = 0, Quarters = 1, Semis = 2, Finals = 3
    if (a.startsWith("Quals")) {
      aType = 0;
    } else if (a.startsWith("Quarters")) {
      aType = 1;
    } else if (a.startsWith("Semis")) {
      aType = 2;
    } else if (a.startsWith("Finals")) {
      aType = 3;
    }

    if (b.startsWith("Quals ")) {
      bType = 0;
    } else if (b.startsWith("Quarters ")) {
      bType = 1;
    } else if (b.startsWith("Semis ")) {
      bType = 2;
    } else if (b.startsWith("Finals")) {
      bType = 3;
    }

    if (aType !== bType) {
      return aType > bType ? 1 : -1;
    }

    var aMatchNum, bMatchNum;
    if (aType === 0 && bType === 0) {
      aMatchNum = parseInt(a.substring(6));
      bMatchNum = parseInt(b.substring(6));

      return aMatchNum > bMatchNum ? 1 : (aMatchNum < bMatchNum ? -1 : 0);
    } else if (aType === 1 && bType === 1) {
      aMatchNum = parseInt(a.substring(17));
      bMatchNum = parseInt(b.substring(17));

      return aMatchNum > bMatchNum ? 1 : (aMatchNum < bMatchNum ? -1 : 0);
    } else if (aType === 2 && bType === 2) {
      aMatchNum = parseInt(a.substring(14));
      bMatchNum = parseInt(b.substring(14));

      return aMatchNum > bMatchNum ? 1 : (aMatchNum < bMatchNum ? -1 : 0);
    }

    return a > b ? 1 : (a < b ? -1 : 0);
  }
}