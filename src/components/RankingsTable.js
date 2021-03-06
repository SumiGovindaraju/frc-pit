import React, { Component } from 'react';
import Cache from '../storage/Cache';
import AppState from '../state/AppState';

export default class RankingsTable extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    Cache.getInstance().getEventEmitter().on("dataChanged", function () {
      instance.forceUpdate();
    });
  }

  render() {
    var team = AppState.getInstance().getTeam();
    var event = AppState.getInstance().getEvent();
    var cache = Cache.getInstance().get();

    var body;
    if (cache.events[event] == null || cache.events[event].rankings == null
      || cache.events[event].rankings.rankings == null || cache.events[event].rankings.rankings.length === 0) {
      body = <h1>No Rankings</h1>;
    } else {
      var data = cache.events[event].rankings.rankings;

      var rows = [];
      for (var ranking in data) {
        var record_exists = data[ranking].record != null; // to account for games like 2015
        rows.push(
          <tr key={ranking}>
            <td className={data[ranking].team_key === team ? "current-team" : ""}>{data[ranking].rank}</td>
            <td className={data[ranking].team_key === team ? "current-team" : ""}>{data[ranking].team_key.substring(3)}</td>
            <td className={data[ranking].team_key === team ? "current-team" : ""}>{data[ranking].sort_orders[0].toFixed(3)}</td>
            <td className={data[ranking].team_key === team ? "current-team" : ""}>{record_exists ? `${data[ranking].record.wins}-${data[ranking].record.losses}-${data[ranking].record.ties}` : "N/A"}</td>
            <td className={data[ranking].team_key === team ? "current-team" : ""}>{data[ranking].matches_played}</td>
            <td className={data[ranking].team_key === team ? "current-team" : ""}>{data[ranking].extra_stats[0]}</td>
          </tr>);
      }

      body = <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Ranking Score</th>
            <th>Record (W-L-T)</th>
            <th>Played</th>
            <th>Total RP</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>;
    }

    return (
      <div className="tab-pane fade rankings" id="rankings" role="tabpanel">
        {body}
      </div>
    );
  }
}