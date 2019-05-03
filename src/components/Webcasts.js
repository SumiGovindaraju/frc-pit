import React, { Component } from 'react';
import AppState from '../state/AppState';
import Cache from '../storage/Cache';

export default class Webcasts extends Component {
  constructor(props) {
    super(props);

    var instance = this;
    var hasDataChanged = false;
    Cache.getInstance().getEventEmitter().on("webcastsUpdated", function () {
      if (!hasDataChanged) {
        instance.forceUpdate();
        hasDataChanged = true;
      }
    });
  }

  componentDidUpdate() {
    if (document.querySelector('.webcasts ul li') === null) {
      return;
    }

    document.querySelector('.webcasts ul li').firstChild.classList.add('active');
    document.querySelector('.webcasts .tab-content .tab-pane').classList.add("show", "active");

    document.querySelectorAll('.webcasts .tab-content .tab-pane iframe').forEach((a) => a.width = document.getElementsByClassName("webcasts")[0].clientWidth);
    document.querySelectorAll('.webcasts .tab-content .tab-pane iframe').forEach((a) => a.height = document.getElementsByClassName("webcasts")[0].clientHeight - 80);
  }

  render() {
    var event = AppState.getInstance().getEvent();
    var showWebcasts = AppState.getInstance().getShowWebcasts();
    var cache = Cache.getInstance().get();

    var body;
    if (!showWebcasts) {
      body = <h1>Webcasts Disabled</h1>
    } else if (!navigator.onLine) {
      body = <h1>Offline: Cannot Access Webcasts</h1>
    } else if (cache.events[event] == null || cache.events[event].webcasts == null || cache.events[event].webcasts.length === 0) {
      body = <h1>No Webcasts</h1>
    } else {
      var data = cache.events[event].webcasts;
      var lis = [], iframes = [];
      for (var webcast in data) {
        if (data[webcast].type === "twitch" || data[webcast].type === "youtube") {
          lis.push(
            <li className="nav-item" key={webcast}>
              <a className="nav-link" data-toggle="tab" href={"#webcast-" + (parseInt(webcast) + 1)} role="tab">Webcast {(parseInt(webcast) + 1)}</a>
            </li>
          );

          iframes.push(
            <div className="tab-pane fade" id={"webcast-" + (parseInt(webcast) + 1)} role="tabpanel" key={webcast}>
              <iframe title={webcast}
                src={(data[webcast].type === "twitch" ? "//player.twitch.tv/?channel=" : "//www.youtube.com/embed/") + data[webcast].channel}
                frameBorder="none"
                scrolling="none"
                allowFullScreen={true}>
              </iframe>
            </div>
          );
        }
      }
      body = <div>
        <ul className="nav nav-tabs" role="tablist">{lis}</ul>
        <div className="tab-content">{iframes}</div>
      </div>
    }

    return (
      <div className="webcasts">
        {body}
      </div>
    );
  }
}