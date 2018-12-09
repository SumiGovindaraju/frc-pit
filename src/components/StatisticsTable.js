import React, { Component } from 'react';

export default class StatisticsTable extends Component {
  render() {
    return (
      <div className="statistics" id="statistics">
        <h1 className="no-statistics" style={{ textAlign: "center", display: "none" }}>No Statistics</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Ranking Score</th>
              <th>Park/Climb Points</th>
              <th>Auto</th>
              <th>Ownership</th>
              <th>Vault</th>
              <th>Record (W-L-T)</th>
              <th>Played</th>
              <th>Total RP</th>
              <th>View Team Info</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}