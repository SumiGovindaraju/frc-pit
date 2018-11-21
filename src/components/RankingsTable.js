import React, { Component } from 'react';

export default class RankingsTable extends Component {
  render() {
    return (
      <div className="tab-pane fade rankings" id="rankings" role="tabpanel">
        <h1 className="no-rankings" style={{ display: "none" }}>No Rankings</h1>
        <table className="table table-striped table-bordered">
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
          <tbody></tbody>
        </table>
      </div>
    );
  }
}