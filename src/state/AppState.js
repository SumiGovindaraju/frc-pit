import { EventEmitter } from "events";

class AppState {
    constructor() {
        // default states, populated through URL vars
        this.team = false;
        this.event = false;
        this.showWebcasts = true;
        this.teamEventVerified = undefined;
        this.eventEmitter = new EventEmitter();

        this.populateStateFromURLVars();
    }

    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new AppState();
        }

        return this.instance;
    }

    getTeam() {
        return this.team;
    }

    getEvent() {
        return this.event;
    }

    getShowWebcasts() {
        return this.showWebcasts;
    }

    getTeamEventVerified() {
        return this.teamEventVerified;
    }

    getEventEmitter() {
        return this.eventEmitter;
    }

    setTeam(team) {
        this.team = team;
        this.eventEmitter.emit("appStateChanged");
    }

    setEvent(event) {
        this.event = event;
        this.eventEmitter.emit("appStateChanged");
    }

    setShowWebcasts(showWebcasts) {
        this.showWebcasts = showWebcasts;
        this.eventEmitter.emit("appStateChanged");
    }

    setTeamEventVerified(teamEventVerified) {
        this.teamEventVerified = teamEventVerified;
        this.eventEmitter.emit("appStateChanged");
    }

    getUrlVars() {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });

        return vars;
    }

    populateStateFromURLVars() {
        this.setTeam(this.getUrlVars()["team"] !== undefined ? this.getUrlVars()["team"] : false);
        this.setEvent(this.getUrlVars()["event"] !== undefined ? this.getUrlVars()["event"] : false);
        this.setShowWebcasts(this.getUrlVars()["showWebcasts"] !== undefined ? JSON.parse(this.getUrlVars()["showWebcasts"]) : true);
    }
}

export default AppState;