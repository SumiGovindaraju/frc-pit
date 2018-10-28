import React, { Component } from 'react';
import ScheduleAndRankings from '../components/ScheduleAndRankings';
import Webcasts from '../components/Webcasts';
import Awards from '../components/Awards';
import Countdown from '../components/Countdown';

export default class Home extends Component {
  componentWillMount () { // create script tag
    var script = document.createElement("script");
    var scriptBody = document.createTextNode(`
      $(document).ready(function() {    
        $(".schedule-rankings").hide();
        $(".webcasts").hide();
        $(".awards").hide();
        $(".countdown").hide();
        $(".settings").show();
        $(".no-team-event-selected").show();
    
        renderListOfEvents();

        if (getUrlVars()["team"] !== undefined && getUrlVars()["event"] !== undefined) {
          team = getUrlVars()["team"];
          event = getUrlVars()["event"];
          render();
        }
    
        setInterval(function() {
          if (window.navigator.onLine && team && event) {
            renderSchedule();
            renderRankings();
            renderAwards();
            renderCountdown();
          }
        }, 120000); // Update information every 2 minutes
      });
    `);
    script.appendChild(scriptBody);
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <h1 className="no-team-event-selected" style={{ textAlign: "center" }}>No Team/Match selected</h1>
        <ScheduleAndRankings />
        <Webcasts />
        <Awards />
        <Countdown />
      </div>
    );
  }
}