import React, { Component } from 'react';
import RankingsTable from '../components/RankingsTable';
import RobotStatistics from '../components/RobotStatistics';

export default class Statistics extends Component {
  componentWillMount() { // create script tag
    var script = document.createElement("script");
    var scriptBody = document.createTextNode(`
      $(document).ready(function() {    
        $(".rankings").addClass("show active");
        $(".rankings").hide();
        $(".settings").show();
        $(".settings-team").hide();
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

        renderListOfEvents();

        if (event) {
          verifyTeamInEvent(
            async function () {
              if (cache.events[event] === undefined) {
                cache.events[event] = { "teams": {}, "awards": {}, "rankings": {}, "matches": {}, "webcasts": {} };
              }
    
              if (team && cache.events[event].teams[team] === undefined) {
                cache.events[event].teams[team] = { "awards": {}, "matches": {} };
              }

              $(".no-team-event-selected").hide();
              $(".loading").show();
    
              document.title = "FRC Pit | " + (team ? team.substring(3) + " @ " : "") + event;

              await updateAPIs();
              
              $(".loading").hide();
              $(".no-team-event-selected").hide();
              $(".rankings").show();

              renderRankings();
            }, async function () {
              $(".loading").hide();
              $(".no-team-event-selected").show();
              $(".rankings").hide();
            }
          );
        }
    
        setInterval(async function() {
          if (event) {
            await updateAPIs();
            renderRankings(false);
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
        <h1 className="loading" style={{ textAlign: "center", display: "none" }}>Loading...</h1>
        <RankingsTable />
        <RobotStatistics />
      </div>
    );
  }
}