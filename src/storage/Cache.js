import { EventEmitter } from "events";
const sizeof = require('object-sizeof');

const LOCAL_STORAGE_KEY = "The Blue Alliance API Cache";
const MAX_CACHE_SIZE = 3.5e6;

class Cache {
    constructor() {
        var local_cache = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (local_cache === null) {
            this.data = { "events": { "list": [] } };
        } else {
            this.data = JSON.parse(local_cache);
        }

        this.eventEmitter = new EventEmitter();

        this.reduceSize();
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

    size() {
        return sizeof(this.data);
    }

    deleteLastUpdatedEvent() {
        var last_updated_event_key = null, last_updated_event_date = new Date();
        for (var event in this.data.events) {
            if (new Date(this.data.events[event].last_updated) < last_updated_event_date) {
                last_updated_event_key = event;
                last_updated_event_date = new Date(this.data.events[event].last_updated);
            }
        }

        if (last_updated_event_key !== null) {
            delete this.data.events[last_updated_event_key];
        }
    }

    /**
     * Only reduces size if necessary
     */
    reduceSize() {
        while(this.size() > MAX_CACHE_SIZE) {
            this.deleteLastUpdatedEvent();
        }
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