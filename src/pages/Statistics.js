import React, { Component } from 'react';
import StatisticsModal from '../components/StatisticsModal';
import AppState from '../state/AppState';
import Cache from '../storage/Cache';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.sortStatistics = this.sortStatistics.bind(this);
    this.setStatisticsModalTeamNum = this.setStatisticsModalTeamNum.bind(this);

    AppState.getInstance().setShowSettingsPane(true);
    AppState.getInstance().setShowOtherSettings(false);

    this.state = { modalTeamNumber: null };
  }

  setStatisticsModalTeamNum(evt) {
    this.setState({ modalTeamNumber: evt.currentTarget.dataset.teamnumber });
  }

  // from w3 schools
  sortStatistics(evt) {
    if (document.readyState !== "complete") {
      return;
    }

    var n = evt.currentTarget.dataset.sortindex;

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
    } else if (cache.events[event] == null || cache.events[event].rankings == null
      || cache.events[event].rankings.rankings == null || cache.events[event].rankings.rankings.length === 0) {
      body = <h1 style={{ textAlign: "center" }}>No Statistics</h1>;
    } else {
      var data = cache.events[event].rankings.rankings;

      var rows = [];
      for (var ranking in data) {
        var extra_stat = cache.events[event].rankings.extra_stats_info[0] ?
          <td>{data[ranking].extra_stats[0] ?
            (data[ranking].extra_stats[0] === parseInt(data[ranking].extra_stats[0]) ? data[ranking].extra_stats[0] : data[ranking].extra_stats[0].toFixed(3)) :
            "N/A"}</td> :
          <React.Fragment></React.Fragment>;
        var stats = [];
        for (var stat in cache.events[event].rankings.sort_order_info) {
          if (data[ranking].sort_orders[stat] === parseInt(data[ranking].sort_orders[stat])) {
            stats.push(<td key={stat}>{data[ranking].sort_orders[stat]}</td>);
          } else {
            stats.push(<td key={stat}>{data[ranking].sort_orders[stat].toFixed(3)}</td>);
          }
        }

        var team_key_valid = data[ranking].team_key.substring(3) == parseInt(data[ranking].team_key.substring(3));
        rows.push(
          <tr key={ranking}>
            <td>{data[ranking].rank}</td>
            <td>{data[ranking].team_key.substring(3)}</td>
            {stats}
            <td>{data[ranking].record != null ? data[ranking].record.wins + "-" + data[ranking].record.losses + "-" + data[ranking].record.ties : "N/A"}</td>
            <td>{data[ranking].dq}</td>
            <td>{data[ranking].matches_played}</td>
            {extra_stat}
            <td>
              <button className={"btn " + (team_key_valid ? "btn-primary" : "btn-secondary")} disabled={!team_key_valid} onClick={this.setStatisticsModalTeamNum} data-teamnumber={team_key_valid ? data[ranking].team_key : null}>
                {team_key_valid ? "View Team Info" : "Invalid Team #"}
              </button>
            </td>
          </tr>);
      }

      var stat_infos = [];
      var stat_sort_index = 2;
      for (var stat_info in cache.events[event].rankings.sort_order_info) {
        stat_infos.push(<th onClick={this.sortStatistics} data-sortindex={stat_sort_index} key={stat_info}>{cache.events[event].rankings.sort_order_info[stat_info].name} <i className="fas fa-sort"></i></th>);
        stat_sort_index++;
      }

      var extra_stats_info = cache.events[event].rankings.extra_stats_info[0] ? <th onClick={this.sortStatistics} data-sortindex={stat_sort_index + 3}>{cache.events[event].rankings.extra_stats_info[0].name} <i className="fas fa-sort"></i></th> : <React.Fragment></React.Fragment>;

      body = <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th onClick={this.sortStatistics} data-sortindex={0}>Rank <i className="fas fa-sort"></i></th>
            <th onClick={this.sortStatistics} data-sortindex={1}>Team <i className="fas fa-sort"></i></th>
            {stat_infos}
            <th>Record (W-L-T)</th>
            <th onClick={this.sortStatistics} data-sortindex={stat_sort_index + 1}>DQ <i className="fas fa-sort"></i></th>
            <th onClick={this.sortStatistics} data-sortindex={stat_sort_index + 2}>Played <i className="fas fa-sort"></i></th>
            {extra_stats_info}
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
        <StatisticsModal teamKey={this.state.modalTeamNumber} eventKey={event} />
      </div>
    );
  }
}