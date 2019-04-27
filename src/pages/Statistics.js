import React, { Component } from 'react';
import StatisticsModal from '../components/StatisticsModal';
import AppState from '../state/AppState';
import Cache from '../storage/Cache';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    Cache.getInstance().getEventEmitter().on("dataChanged", function () {
      instance.forceUpdate();
    });

    this.sortStatistics = this.sortStatistics.bind(this);

    AppState.getInstance().setShowSettingsPane(true);
    AppState.getInstance().setShowOtherSettings(false);
  }

  // from w3 schools
  sortStatistics(n) {
    if (document.readyState !== "complete") {
      return;
    }

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("statistics").getElementsByTagName("table")[0];
    if (table === null) {
      return;
    }

    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (dir === "asc") {
          if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  render() {
    var event = AppState.getInstance().getEvent();
    var cache = Cache.getInstance().get();

    var body;
    if (!event) {
      body = <h1 style={{ textAlign: "center" }}>No Event Selected</h1>;
    } else if (cache.events[event] === undefined || cache.events[event].rankings === undefined
      || cache.events[event].rankings.rankings === null || cache.events[event].rankings.rankings.length === 0) {
      body = <h1 style={{ textAlign: "center" }}>No Statistics</h1>;
    } else {
      var data = cache.events[event].rankings.rankings;

      var rows = [];
      for (var ranking in data) {
        rows.push(
          <tr key={ranking}>
            <td>{data[ranking].rank}</td>
            <td>{data[ranking].team_key.substring(3)}</td>
            <td>{data[ranking].sort_orders[0].toFixed(3)}</td>
            <td>{data[ranking].sort_orders[1]}</td>
            <td>{data[ranking].sort_orders[2]}</td>
            <td>{data[ranking].sort_orders[3]}</td>
            <td>{data[ranking].sort_orders[4]}</td>
            <td>{data[ranking].record.wins}-{data[ranking].record.losses}-{data[ranking].record.ties}</td>
            <td>{data[ranking].dq}</td>
            <td>{data[ranking].matches_played}</td>
            <td>{data[ranking].extra_stats[0]}</td>
            <td></td>
          </tr>);
      }

      body = <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th onClick={() => this.sortStatistics(0)}>Rank <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(1)}>Team <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(2)}>Ranking Score <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(3)}>Cargo <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(4)}>Hatch Panel <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(5)}>HAB Climb <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(6)}>Sandstorm Bonus <i className="fas fa-sort"></i></th>
            <th>Record (W-L-T)</th>
            <th onClick={() => this.sortStatistics(8)}>DQ <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(9)}>Played <i className="fas fa-sort"></i></th>
            <th onClick={() => this.sortStatistics(10)}>Total RP <i className="fas fa-sort"></i></th>
            <th>View Team Info</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    }

    return (
      <div>
        <div className="statistics" id="statistics">
          {body}
        </div>
        <StatisticsModal />
      </div>
    );
  }
}