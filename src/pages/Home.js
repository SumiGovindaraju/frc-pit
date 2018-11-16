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

        $("body").tooltip({selector: '[data-toggle=tooltip]'});

        if (getUrlVars()["team"] !== undefined) {
          team = getUrlVars()["team"];
        }

        if (getUrlVars()["event"] !== undefined) {
          event = getUrlVars()["event"];
        }
        
        $('form input').keydown(function(event){
          if(event.keyCode == 13) {
            event.preventDefault();
            return false;
          }
        });

        if (event) {
          render(true);
        }
    
        setInterval(function() {
          if (event) {
            render(false);
          }
        }, 120000); // Attempt to render every 2 minutes no matter what
      });
    `);
    script.appendChild(scriptBody);
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <h1 className="no-team-event-selected" style={{ textAlign: "center" }}>No Event/Team selected</h1>
        <ScheduleAndRankings />
        <Webcasts />
        <Awards />
        <Countdown />
      </div>
    );
  }
}