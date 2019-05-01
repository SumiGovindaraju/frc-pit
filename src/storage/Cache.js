import { EventEmitter } from "events";

const LOCAL_STORAGE_KEY = "The Blue Alliance API Cache";

class Cache {
    constructor() {
        var local_cache = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (local_cache === null) {
            this.set({ "events": { "list": [] } });
        } else {
            this.set(JSON.parse(local_cache));
        }

        this.eventEmitter = new EventEmitter();
        this.sendDataChangedEvent();
    }

    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new Cache();
        }

        return this.instance;
    }

    getEventEmitter() {
        return this.eventEmitter;
    }

    writeToLocalStorage() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    }

    get() {
        return this.data;
    }

    set(data) {
        this.data = data;
        this.writeToLocalStorage();
        this.sendDataChangedEvent();
    }

    sendDataChangedEvent() {
        this.eventEmitter.emit("dataChanged");
    }

    sendUpdatedWebcastsEvent() {
        this.eventEmitter.emit("webcastsUpdated");
    }

    sendEventListChangedEvent() {
        this.eventEmitter.emit("eventListChanged");
    }
}

export default Cache;