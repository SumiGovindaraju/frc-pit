import React, { Component } from 'react';
import AppState from '../state/AppState';
import Cache from '../storage/Cache';

export default class Awards extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    Cache.getInstance().getEventEmitter().on("dataChanged", function () {
      instance.forceUpdate();
    });
  }

  render() {
    var team = AppState.getInstance().getTeam();
    var event = AppState.getInstance().getEvent();
    var cache = Cache.getInstance().get();

    var body;
    if ((cache.events[event] == null || cache.events[event].awards == null || cache.events[event].awards.length === 0)
      || (team && (cache.events[event].teams[team] == null || cache.events[event].teams[team].awards == null || cache.events[event].teams[team].awards.length === 0))) {
      body = <h1>No Awards</h1>;
    } else {
      var data = team ? cache.events[event].teams[team].awards : cache.events[event].awards;
      var lis = [];
      for (var award in data) {
        if (team) {
          lis.push(
            <li key={award}>{data[award].name} {data[award].recipient_list.map(x => x.team_key === team && x.awardee !== null ? "(" + x.awardee + ")" : "").join("")}</li>
          );
        } else {
          lis.push(
            <li key={award}>{data[award].name} ({data[award].recipient_list.map(x => x.awardee !== null ? x.awardee : x.team_key.substring(3)).join(", ")})</li>
          );
        }
      }

      body = <div>
        <h1>Awards</h1>
        <ul>
          {lis}
        </ul>
      </div>
    }

    return (
      <div className="awards">
        {body}
      </div>
    );
  }
}