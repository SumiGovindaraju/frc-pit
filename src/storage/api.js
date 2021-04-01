import Cache from "./Cache";
import AppState from "../state/AppState";

const TBA_BASE_URL = "https://www.thebluealliance.com/api/v3";
const X_TBA_Auth_Key = "83kBcUgRuDvJ1XLVXpB2ROeuRAzHoWpX9IRiWkRuwv8B9CryAlc3izY3ZXVOD4Hm";

var FETCH_CONFIG = {
    method: "GET",
    headers: {
        "X-TBA-Auth-Key": X_TBA_Auth_Key
    },
};

async function verifyTeamInEvent(team, event) {
    if (!event || AppState.getInstance().getTeamEventVerified() !== undefined) {
        return;
    }

    if (team && !team.startsWith("frc")) {
        alert("Invalid team", true);
        return;
    }

    if (event && (event.length <= 4 || isNaN(event.substring(0, 4)))) {
        alert("Invalid event", true);
        return;
    }

    // handle cases where we are offline
    var cache = Cache.getInstance().get();
    if (cache.events != null && cache.events[event] != null) {
        if ((team && cache.events[event].teams[team] == null) && !navigator.onLine) { // if offline and no team data at this event is available
            alert("Team data not cached. FRC Pit is offline.", true);
            return;
        } else if ((team && cache.events[event].teams[team] != null) && !navigator.onLine) { // if offline and team data at this event is available
            AppState.getInstance().setTeamEventVerified(true);
            console.log(cache.events)
            alert("FRC Pit is offline. Using cached data.", false)
            return;
        } else if (!team && !navigator.onLine) { // if offline and event data is no available (no team)
            AppState.getInstance().setTeamEventVerified(true);
            console.log(cache.events)
            alert("FRC Pit is offline. Using cached data.", false)
            return;
        }
    } else if (!navigator.onLine) { // if offline and no cached data for this event is available
        alert("Event data not cached. FRC Pit is offline.", true);
        return;
    }

    var promises = [];
    var ret_val;
    promises.push(fetch(TBA_BASE_URL + (team ? "/team/" + team : "") + "/events/" + event.substring(0, 4), FETCH_CONFIG)
        .then(res => res.json())
        .then((result) => {
            for (var i in result) {
                if (result[i].key === event) {
                    ret_val = true;
                    return;
                }
            }

            alert(team ? "Team is not in event" : "Event does not exist", true);
            ret_val = false;
        }).catch((error) => {
            if (error.message !== "TypeError: Failed To Fetch") {
                alert("FRC Pit is offline.", true)
            } else {
                alert(team ? "Team is not in event" : "Event does not exist", true);
            }
            ret_val = false;
        }));

    await Promise.all(promises);

    AppState.getInstance().setTeamEventVerified(ret_val);
}

export async function pullFromTBA() {
    var promises = [];
    var cache_instance = Cache.getInstance();
    var cache = cache_instance.get();

    // list of events
    promises.push(fetch(TBA_BASE_URL + "/events/" + (new Date()).getFullYear() + "/simple", FETCH_CONFIG)
        .then(res => res.json())
        .then((result) => {
            cache.events.list = [];

            for (var i in result) {
                var end_of_event_date = new Date();
                end_of_event_date.setFullYear(result[i].end_date.substring(0, 4));
                end_of_event_date.setMonth(parseInt(result[i].end_date.substring(5, 7)) - 1);
                end_of_event_date.setDate(result[i].end_date.substring(8, 10));

                if (new Date() <= end_of_event_date) {
                    cache.events.list.push(result[i]);
                }
            }

            cache_instance.set(cache);
            cache_instance.sendEventListChangedEvent();
        }).catch((error) => {
            console.error(error);
        }));

    var team = AppState.getInstance().getTeam();
    var event = AppState.getInstance().getEvent();
    var showWebcasts = AppState.getInstance().getShowWebcasts();

    await verifyTeamInEvent(team, event);
    if (!event || !AppState.getInstance().getTeamEventVerified()) {
        await Promise.all(promises);
        return;
    }

    if (cache.events[event] === undefined) {
        cache.events[event] = { "teams": {}, "awards": {}, "rankings": {}, "matches": {}, "webcasts": {}, "statistics": {}, "last_updated": (new Date()).toUTCString() };
    }

    if (team) {
        if (cache.events[event].teams[team] === undefined) {
            cache.events[event].teams[team] = { "awards": {}, "matches": {}, "photos": [], "name": "", "rookie_year": 0, "status": "", "location": "" };
        }
        // awards (team specific)
        promises.push(fetch(TBA_BASE_URL + "/team/" + team + "/event/" + event + "/awards", FETCH_CONFIG)
            .then(res => res.json())
            .then((result) => {
                cache.events[event].teams[team].awards = result;
                cache.events[event].last_updated = (new Date()).toUTCString();
                cache_instance.set(cache);
            }).catch((error) => {
                console.error(error);
            }));

        // matches (countdown and schedule) (team specific)
        promises.push(fetch(TBA_BASE_URL + "/team/" + team + "/event/" + event + "/matches", FETCH_CONFIG)
            .then(res => res.json())
            .then((result) => {
                cache.events[event].teams[team].matches = result;
                cache.events[event].last_updated = (new Date()).toUTCString();
                cache_instance.set(cache);
            }).catch((error) => {
                console.error(error);
            }));
    } else {
        // awards (event)
        promises.push(fetch(TBA_BASE_URL + "/event/" + event + "/awards", FETCH_CONFIG)
            .then(res => res.json())
            .then((result) => {
                cache.events[event].awards = result;
                cache.events[event].last_updated = (new Date()).toUTCString();
                cache_instance.set(cache);
            }, (error) => {
                console.error(error);
            }));

        // matches (countdown and schedule) (event)
        promises.push(fetch(TBA_BASE_URL + "/event/" + event + "/matches", FETCH_CONFIG)
            .then(res => res.json())
            .then((result) => {
                console.log("Matches for " + event + ": ");
                console.log(JSON.stringify(result));
                cache.events[event].matches = result;
                cache.events[event].last_updated = (new Date()).toUTCString();
                cache_instance.set(cache);
            }).catch((error) => {
                console.error(error);
            }));
    }

    // rankings
    promises.push(fetch(TBA_BASE_URL + "/event/" + event + "/rankings", FETCH_CONFIG)
        .then(res => res.json())
        .then((result) => {
            cache.events[event].rankings = result;
            cache.events[event].last_updated = (new Date()).toUTCString();
            cache_instance.set(cache);
        }).catch((error) => {
            console.error(error);
        }));

    // webcasts
    if (showWebcasts) {
        promises.push(fetch(TBA_BASE_URL + "/event/" + event, FETCH_CONFIG)
            .then(res => res.json())
            .then((result) => {
                if (result == null || result.webcasts == null) {
                    throw new Error("Webcast API call returns null");
                }

                cache.events[event].webcasts = result.webcasts;
                cache.events[event].last_updated = (new Date()).toUTCString();
                cache_instance.set(cache);
                cache_instance.sendUpdatedWebcastsEvent();
            }).catch((error) => {
                console.error(error);
            }));
    }

    await Promise.all(promises);
}

export default { pullFromTBA }