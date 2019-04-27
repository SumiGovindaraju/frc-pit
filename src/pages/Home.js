import React, { Component } from 'react';
import ScheduleAndRankings from '../components/ScheduleAndRankings';
import Webcasts from '../components/Webcasts';
import Awards from '../components/Awards';
import Countdown from '../components/Countdown';
import AppState from '../state/AppState';

export default class Home extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    AppState.getInstance().getEventEmitter().on("appStateChanged", function () {
      instance.forceUpdate();
    });

    AppState.getInstance().setShowSettingsPane(true);
    AppState.getInstance().setShowOtherSettings(true);
  }

  render() {
    return (
      <div>
        {AppState.getInstance().getTeamEventVerified() === undefined || !AppState.getInstance().getTeamEventVerified() ?
          <h1 className="no-team-event-selected" style={{ textAlign: "center" }}>No Event/Team selected</h1> :
          <div>
            <ScheduleAndRankings />
            <Webcasts />
            <Awards />
            <Countdown /></div>}
      </div>
    );
  }
}