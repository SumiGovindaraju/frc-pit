var TBA_BASE_URL = "https://www.thebluealliance.com/api/v3";
var X_TBA_Auth_Key = "83kBcUgRuDvJ1XLVXpB2ROeuRAzHoWpX9IRiWkRuwv8B9CryAlc3izY3ZXVOD4Hm";
var team = false, event = false;
var countdownInterval;
var timeZone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var cache = JSON.parse(localStorage.getItem("The Blue Alliance API Cache")) === null ? {"events": {"list": []}} : JSON.parse(localStorage.getItem("The Blue Alliance API Cache"));
var isOnline = navigator.onLine;

function getMatchTimeInMS(match) {
    if (match.actual_time !== undefined && match.actual_time !== null) {
        return match.actual_time * 1000;
    }
    
    if (match.predicted_time !== undefined && match.predicted_time !== null) {
        return match.predicted_time * 1000;
    }

    return match.time * 1000;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });

    return vars;
}

function render() {
    if (!event) {
        $(".schedule-rankings").hide();
        $(".webcast").hide();
        $(".awards").hide();
        $(".countdown").hide();
        $(".no-team-event-selected").show();

        alert("Invalid team or event");
        return;
    }

    verifyTeamInEvent(function() {
        if (cache.events[event] === undefined) {
            cache.events[event] = {"teams": {}, "awards": {}, "rankings": {}, "matches": {}, "webcasts": {}};
        }

        if (team && cache.events[event].teams[team] === undefined) {
            cache.events[event].teams[team] = {"awards": {}, "matches": {}};
        }

        document.title = "FRC Pit | " + (team ? team.substring(3) + " @ " : "") + event;

        updateAPIs();

        $(".no-team-event-selected").hide();
        $(".schedule-rankings").show();
        $(".webcasts").show();
        $(".awards").show();
        $(".countdown").show();
    
        renderSchedule();
        renderRankings();
        renderWebcasts();
        renderAwards();
        renderCountdown();
    }, function() {
        $(".no-team-event-selected").show();
        $(".schedule-rankings").hide();
        $(".webcasts").hide();
        $(".awards").hide();
        $(".countdown").hide();
    });
}

function renderAwards() {
    if (team) {
        $(".awards ul").empty();

        data = cache.events[event].teams[team].awards;
        if (data === undefined || data.length === undefined || data.length === 0) {
            $(".awards h1").last().hide();
            $(".awards ul").hide();
            $(".no-awards").show();
        } else {
            $(".no-awards").hide();
            $(".awards h1").last().show();
            $(".awards ul").show();
            for (var award in data) {
                $(".awards ul").append(`
                    <li>${data[award].name} ${data[award].recipient_list.map(x => x.team_key === team && x.awardee !== null ? "(" + x.awardee + ")" : "").join("")}</li>
                `);
            }
        }
    } else {
        $(".awards ul").empty();

        data = cache.events[event].awards;
        if (data === undefined || data.length === 0) {
            $(".awards h1").last().hide();
            $(".awards ul").hide();
            $(".no-awards").show();
        } else {
            // cache.events[event].awards = data;

            $(".no-awards").hide();
            $(".awards h1").last().show();
            $(".awards ul").show();
            for (var award in data) {
                $(".awards ul").append(`
                        <li>${data[award].name} (${data[award].recipient_list.map(x => x.awardee !== null ? x.awardee : x.team_key.substring(3)).join(", ")})</li>
                    `);
            }
        }
    }
}

function renderCountdown() {
    clearInterval(countdownInterval);

    data = team ? cache.events[event].teams[team].matches : cache.events[event].matches;

    if (data === undefined || data.length === undefined || data.length === 0) {
        $(".countdown-timer-tag").hide();
        $(".countdown h2").hide();
        $(".no-countdown").show();
    } else {
        var closestMatchTime = Number.MAX_VALUE;
        var closestMatchName = null;

        for (var match in data) {
            if ((new Date()) < (new Date(getMatchTimeInMS(data[match]))) && getMatchTimeInMS(data[match]) < closestMatchTime) {
                closestMatchTime = getMatchTimeInMS(data[match]);
                closestMatchName = data[match].comp_level === "qm" ? "Quals " + data[match].match_number : (data[match].comp_level === "qf" ? "Quarters " + data[match].set_number + " Match " + data[match].match_number : (data[match].comp_level === "sf" ? "Semis " + data[match].set_number + " Match " + data[match].match_number : "Finals " + data[match].match_number));
            }
        }

        if (closestMatchTime === Number.MAX_VALUE || closestMatchName === null) {
            $(".countdown-timer-tag").hide();
            $(".countdown h2").hide();
            clearInterval(countdownInterval);
            $(".no-countdown").show();
        } else {
            $(".no-countdown").hide();
            $(".countdown-timer-tag").show();
            $(".countdown h2").text("Until " + closestMatchName);
            $(".countdown h2").show();

            var countDownDate = new Date(closestMatchTime).getTime();

            countdownInterval = setInterval(function() {
                var distance = countDownDate - (new Date());

                var hours = parseInt((distance / (1000 * 60 * 60)) % 24);
                var minutes = parseInt((distance / (1000 * 60)) % 60);
                var seconds = parseInt((distance / 1000) % 60);

                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;

                if (distance >= 0) {
                    $(".countdown-timer-tag").text(hours + ":" + minutes + ":" + seconds);
                } else {
                    $(".countdown-timer-tag").hide();
                    $(".countdown h2").hide();
                    clearInterval(countdownInterval);
                    $(".no-countdown").show();

                    renderCountdown();
                }
            }, 1000);
        }
    }
}

function renderListOfEvents() {
    if (team) {
        $(".settings input[type='number']").val(parseInt(team.substring(3)));
    }

    $("select").empty();
    
    data = cache.events.list;
    for (var i in data) {
        $("select").append("<option value='" + data[i].key + "' " + (event && event === data[i].key ? "selected" : "") + ">" + data[i].name + " (" + data[i].key + ")</option>");
    }

    if ($("select").children().length === 0) {
        $("select").append("<option disabled>No Upcoming Events</option>");
    }
}

function renderRankings() {
    $(".rankings table tbody").empty();

    data = cache.events[event].rankings;
    if (data === undefined || data.length === undefined || data.length === 0) {
        $(".rankings table").hide();
        $(".no-rankings").show();
    } else {
        $(".no-rankings").hide();
        $(".rankings table").show();
        for (var ranking in data) {
            $("#rankings table tbody").append(`<tr>
                    <td ${data[ranking].team_key === team ? "class='current-team'" : ""}>${data[ranking].rank}</td>
                    <td ${data[ranking].team_key === team ? "class='current-team'" : ""}>${data[ranking].team_key.substring(3)}</td>
                    <td ${data[ranking].team_key === team ? "class='current-team'" : ""}>${data[ranking].sort_orders[0].toFixed(3)}</td>
                    <td ${data[ranking].team_key === team ? "class='current-team'" : ""}>${data[ranking].record.wins}-${data[ranking].record.losses}-${data[ranking].record.ties}</td>
                    <td ${data[ranking].team_key === team ? "class='current-team'" : ""}>${data[ranking].matches_played}</td>
                    <td ${data[ranking].team_key === team ? "class='current-team'" : ""}>${data[ranking].extra_stats[0]}</td>
                </tr>`);
        }
    }
}

function renderSchedule() {
    $(".schedule table tbody").empty();

    data = team ? cache.events[event].teams[team].matches : cache.events[event].matches;
    if (data === undefined || data.length === undefined || data.length === 0) {
        $(".schedule table").hide();
        $(".no-schedule").show();
    } else {
        // cache.events[event].matches = data;

        $(".no-schedule").hide();
        $(".schedule table").show();
        for (var match in data) {
            if (!team || (data[match].alliances.red.team_keys.includes(team.toString()) || data[match].alliances.blue.team_keys.includes(team.toString()))) {
                var append = `
                <tr>
                    <td>${data[match].comp_level === "qm" ? "Quals " + data[match].match_number : (data[match].comp_level === "qf" ? "Quarters " + data[match].set_number + " Match " + data[match].match_number : (data[match].comp_level === "sf" ? "Semis " + data[match].set_number + " Match " + data[match].match_number : "Finals " + data[match].match_number))}</td>
                    <td class="red ${data[match].alliances.red.team_keys[0] === team ? "current-team" : ""}">${data[match].alliances.red.team_keys[0].substring(3)}</td>
                    <td class="red ${data[match].alliances.red.team_keys[1] === team ? "current-team" : ""}">${data[match].alliances.red.team_keys[1].substring(3)}</td>
                    <td class="red ${data[match].alliances.red.team_keys[2] === team ? "current-team" : ""}">${data[match].alliances.red.team_keys[2].substring(3)}</td>
                    <td class="blue ${data[match].alliances.blue.team_keys[0] === team ? "current-team" : ""}">${data[match].alliances.blue.team_keys[0].substring(3)}</td>
                    <td class="blue ${data[match].alliances.blue.team_keys[1] === team ? "current-team" : ""}">${data[match].alliances.blue.team_keys[1].substring(3)}</td>
                    <td class="blue ${data[match].alliances.blue.team_keys[2] === team ? "current-team" : ""}">${data[match].alliances.blue.team_keys[2].substring(3)}</td>`;

                if (data[match].alliances.red.score >= 0 && data[match].alliances.blue.score >= 0) {
                    append += `
                        <td class="red-score ${data[match].winning_alliance === "red" ? "winner" : ""} ${data[match].alliances.red.team_keys.includes(team) ? "current-team" : ""}" data-toggle="tooltip" data-placement="top" title="${data[match].score_breakdown.red.autoQuestRankingPoint ? "Auto Quest" : ""}${data[match].score_breakdown.red.autoQuestRankingPoint && data[match].score_breakdown.red.faceTheBossRankingPoint ? " & " : ""}${data[match].score_breakdown.red.faceTheBossRankingPoint ? "Face The Boss" : ""}">${data[match].alliances.red.score}</td>
                        <td class="blue-score ${data[match].winning_alliance === "blue" ? "winner" : ""} ${data[match].alliances.blue.team_keys.includes(team) ? "current-team" : ""}" data-toggle="tooltip" data-placement="top" title="${data[match].score_breakdown.blue.autoQuestRankingPoint ? "Auto Quest" : ""}${data[match].score_breakdown.blue.autoQuestRankingPoint && data[match].score_breakdown.blue.faceTheBossRankingPoint ? " & " : ""}${data[match].score_breakdown.blue.faceTheBossRankingPoint ? "Face The Boss" : ""}">${data[match].alliances.blue.score}</td>`;
                } else {
                    var matchDate = new Date(getMatchTimeInMS(data[match]));
                    append += `
                        <td colspan="2"><time datetime='${matchDate.toISOString()}'>${days[matchDate.getDay()]}, ${matchDate.toLocaleTimeString().replace(/:\d{2}\s/, ' ')}</time></td>`
                }
                append += `</tr>`;

                $("#schedule table tbody").append(append);
            }
        }

        sortSchedule();
    }
}

function renderWebcasts() {
    $(".webcasts ul").empty();
    $(".webcasts .tab-content").empty();

    data = cache.events[event].webcasts;
    if (!navigator.onLine) {
        $(".no-internet").show();
    } else if (data === undefined || data.length === undefined || data.length === 0) {
        $(".webcasts ul").hide();
        $(".webcasts .tab-content").hide();
        $(".no-webcasts").show();
    } else {
        $(".no-webcasts").hide();
        $(".webcasts ul").show();
        $(".webcasts .tab-content").show();
        for (var webcast in data) {
            if (data[webcast].type === "twitch" || data[webcast].type === "youtube") {
                $(".webcasts ul").append(`
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#webcast-${(parseInt(webcast) + 1)}" role="tab">Webcast ${(parseInt(webcast) + 1)}</a>
                        </li>
                    `);

                $(".webcasts .tab-content").append(`
                        <div class="tab-pane fade" id="webcast-${(parseInt(webcast) + 1)}" role="tabpanel">
                            <iframe
                                src="${data[webcast].type === "twitch" ? "//player.twitch.tv/?channel=" : "//www.youtube.com/embed/"}${data[webcast].channel}"
                                frameborder="none"
                                scrolling="none"
                                allowfullscreen="true">
                            </iframe>
                        </div>
                    `);
            }
        }

        if ($(".webcasts ul").children().length === 0) {
            $(".webcasts ul").hide();
            $(".webcasts .tab-content").hide();
            $(".no-webcasts").show();
        }
    }

    $('.webcasts ul li').first().children().addClass('active');
    $('.webcasts .tab-content .tab-pane').first().addClass('show active');

    $(".webcasts .tab-content .tab-pane iframe").width($(".webcasts").width());
    $(".webcasts .tab-content .tab-pane iframe").height($(".webcasts").height() - 80);
}

function setTeamNumberAndEvent() {
    if ($("select").val() === "") {
        alert("Event field must be filled");
        return;
    }

    team = $("input").val() !== "" ? "frc" + $("input").val() : false;
    event = $("select").val().substring($("select").val());

    verifyTeamInEvent(function() {
        window.location.href = window.location.href.split("?")[0] + "?event=" + event + (team ? "&team=" + team : "");
    }, function() {});
}

function sortSchedule() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("schedule-table");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];

            if (sortScheduleCompare(x.innerHTML, y.innerHTML) === 1) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// returns 1 if a is a later match than b, 0 if a is the same match as b, and -1 if a is an earlier match than b
function sortScheduleCompare(a, b) {
    var aType, bType;
    // Quals = 0, Quarters = 1, Semis = 2, Finals = 3
    if (a.startsWith("Quals")) {
        aType = 0;
    } else if (a.startsWith("Quarters")) {
        aType = 1;
    } else if (a.startsWith("Semis")) {
        aType = 2;
    } else if (a.startsWith("Finals")) {
        aType = 3;
    }

    if (b.startsWith("Quals ")) {
        bType = 0;
    } else if (b.startsWith("Quarters ")) {
        bType = 1;
    } else if (b.startsWith("Semis ")) {
        bType = 2;
    } else if (b.startsWith("Finals")) {
        bType = 3;
    }

    if (aType !== bType) {
        return aType > bType ? 1 : -1;
    }

    var aMatchNum, bMatchNum;
    if (aType === 0 && bType === 0) {
        aMatchNum = parseInt(a.substring(6));
        bMatchNum = parseInt(b.substring(6));

        return aMatchNum > bMatchNum ? 1 : (aMatchNum < bMatchNum ? -1 : 0);
    } else if (aType === 1 && bType === 1) {
        aMatchNum = parseInt(a.substring(17));
        bMatchNum = parseInt(b.substring(17));

        return aMatchNum > bMatchNum ? 1 : (aMatchNum < bMatchNum ? -1 : 0);
    } else if (aType === 2 && bType === 2) {
        aMatchNum = parseInt(a.substring(14));
        bMatchNum = parseInt(b.substring(14));

        return aMatchNum > bMatchNum ? 1 : (aMatchNum < bMatchNum ? -1 : 0);
    }

    return a > b ? 1 : (a < b ? -1 : 0);
}

// Verify Team is in Event
function verifyTeamInEvent(successCallback, errorCallback) {
    if (cache.events[event] != undefined) {
        if ((team && cache.events[event].teams[team] == undefined) && !navigator.onLine) {
            errorCallback();
            alert("Team data not cached. FRC Pit is offline.");
            return;
        }
    } else {
        errorCallback();
        alert("Event data not cached. FRC Pit is offline.");
        return;
    }

    if (window.onLine) { // just to make sure
        $.ajax({
            url: TBA_BASE_URL + (team ? "/team/" + team : "") + "/events/" + event.substring(0, 4),
            type: "GET",
            headers: {
                "X-TBA-Auth-Key": X_TBA_Auth_Key
            },
            success: function(data) {
                for (var i in data) {
                    if (data[i].key === event) {
                        successCallback();
                        return;
                    }
                }

                alert(team ? "Team is not in event" : "Event does not exist");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseText);
                errorCallback();
                alert(team ? "Team is not in event" : "Event does not exist");
            }
        });
    } else {
        successCallback();
    }
}

function updateAPIs() {
    if (!navigator.onLine) {
        return;
    }

    // awards (team specific)
    if (team) {
        $.ajax({
            url: TBA_BASE_URL + "/team/" + team + "/event/" + event + "/awards",
            type: "GET",
            headers: {
                "X-TBA-Auth-Key": X_TBA_Auth_Key
            },
            success: function(data) {
                cache.events[event].teams[team].awards = data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseText);
            }
        });
    }

    // awards (event)
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event + "/awards",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            cache.events[event].awards = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });

    // matches (countdown and schedule) (team specific)
    if (team) {
        $.ajax({
            url: TBA_BASE_URL + "/team/" + team + "/event/" + event + "/matches",
            type: "GET",
            headers: {
                "X-TBA-Auth-Key": X_TBA_Auth_Key
            },
            success: function(data) {
                cache.events[event].teams[team].matches = data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseText);
            }
        });
    }

    // matches (countdown and schedule) (event)
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event + "/matches",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            cache.events[event].matches = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });

    // rankings
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event + "/rankings",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            cache.events[event].rankings = data.rankings;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });

    // webcasts
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event,
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            cache.events[event].webcasts = data.webcasts;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });

    // list of events
    $.ajax({
        url: TBA_BASE_URL + "/events/" + (new Date()).getFullYear() + "/simple",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            cache.events.list = [];

            for (var i in data) {
                var end_of_event_date = new Date();
                end_of_event_date.setFullYear(data[i].end_date.substring(0, 4));
                end_of_event_date.setMonth(parseInt(data[i].end_date.substring(5, 7)) - 1);
                end_of_event_date.setDate(data[i].end_date.substring(8, 10));

                if (new Date() <= end_of_event_date) {
                    cache.events.list.push(data[i]);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });
}

setInterval(function() {
    localStorage.setItem("The Blue Alliance API Cache", JSON.stringify(cache));
}, 100);

setInterval(function() { // immediately render when you get internet, after losing connection
    if (navigator.onLine && !isOnline) {
        render();
    }

    isOnline = navigator.onLine;
}, 100 );