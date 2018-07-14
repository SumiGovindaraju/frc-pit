import React, { Component } from 'react';

export default class ScheduleTable extends Component {
  render() {
    return (
      <div className="tab-pane fade show active schedule" id="schedule" role="tabpanel">
        <h1 className="no-schedule" style={{display: "none"}}>No Schedule</h1>
        <table className="table table-bordered" id="schedule-table">
          <thead>
            <tr>
              <th>Match</th>
              <th colSpan="3">Red Alliance</th>
              <th colSpan="3">Blue Alliance</th>
              <th colSpan="2">Scores</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}