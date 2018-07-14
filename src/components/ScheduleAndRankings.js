import React, { Component } from 'react';
import ScheduleTable from './ScheduleTable';
import RankingsTable from './RankingsTable';

export default class ScheduleAndRankings extends Component {
  render() {
    return (
      <div className="schedule-rankings">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#schedule" role="tab">Schedule</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#rankings" role="tab">Rankings</a>
          </li>
        </ul>
        <div className="tab-content">
          <ScheduleTable />
          <RankingsTable />
        </div>
      </div>
    );
  }
}