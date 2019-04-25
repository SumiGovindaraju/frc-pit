import React, { Component } from 'react';
import ScheduleAndRankings from '../components/ScheduleAndRankings';
import Webcasts from '../components/Webcasts';
import Awards from '../components/Awards';
import Countdown from '../components/Countdown';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="no-team-event-selected" style={{ textAlign: "center" }}>No Event/Team selected</h1>
        <h1 className="loading" style={{ textAlign: "center", display: "none" }}>Loading...</h1>
        <ScheduleAndRankings />
        <Webcasts />
        <Awards />
        <Countdown />
      </div>
    );
  }
}