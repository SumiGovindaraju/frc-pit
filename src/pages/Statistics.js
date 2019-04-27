import React, { Component } from 'react';
import StatisticsTable from '../components/StatisticsTable';
import StatisticsModal from '../components/StatisticsModal';
import AppState from '../state/AppState';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    AppState.getInstance().setShowSettingsPane(true);
    AppState.getInstance().setShowOtherSettings(false);
  }

  render() {
    return (
      <div>
        <h1 className="no-team-event-selected" style={{ textAlign: "center" }}>No Event/Team selected</h1>
        <h1 className="loading" style={{ textAlign: "center", display: "none" }}>Loading...</h1>
        <StatisticsTable />
        <StatisticsModal />
      </div>
    );
  }
}