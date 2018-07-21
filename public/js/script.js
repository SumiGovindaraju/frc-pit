var TBA_BASE_URL = "https://www.thebluealliance.com/api/v3";
var X_TBA_Auth_Key = "83kBcUgRuDvJ1XLVXpB2ROeuRAzHoWpX9IRiWkRuwv8B9CryAlc3izY3ZXVOD4Hm";
var team = false, event = false;
var countdownInterval;
var timeZone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });

    return vars;
}

function render() {
    if (team === false || event === false) {
        $(".schedule-rankings").hide();
        $(".webcast").hide();
        $(".awards").hide();
        $(".countdown").hide();
        $(".no-team-event-selected").show();

        alert("Invalid team or event");
        return;
    }

    verifyTeamInEvent(function() {
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
    });
}

function renderAwards() {
    $.ajax({
        url: TBA_BASE_URL + "/team/" + team + "/event/" + event + "/awards",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            $(".awards ul").empty();
            if (data === undefined || data.length === 0) {
                $(".awards h1").last().hide();
                $(".awards ul").hide();
                $(".no-awards").show();
            } else {
                $(".no-awards").hide();
                $(".awards h1").last().show();
                $(".awards ul").show();
                for (var award in data) {
                    $(".awards ul").append(`
                            <li>${data[award].name} ${(data[award].recipient_list[0].awardee !== null ? "(" + data[award].recipient_list[0].awardee + ")" : "")}</li>
                        `);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
            $(".awards h1").last().hide();
            $(".awards ul").hide();
            $(".no-awards").show();
        }
    });
}

function renderCountdown() {
    clearInterval(countdownInterval);
    $.ajax({
        url: TBA_BASE_URL + "/team/" + team + "/event/" + event + "/matches",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            if (data === undefined || data.length === 0) {
                $(".countdown-timer-tag").hide();
                $(".countdown h2").hide();
                $(".no-countdown").show();
            } else {
                var closestMatchTime = Number.MAX_VALUE;
                var closestMatchName = null;

                for (var match in data) {
                    if ((new Date()) < (new Date(data[match].predicted_time * 1000)) && data[match].predicted_time * 1000 < closestMatchTime) {
                        closestMatchTime = data[match].predicted_time * 1000;
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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
            $(".countdown-timer-tag").hide();
            $(".countdown h2").hide();
            $(".no-countdown").show();
        }
    });
}

function renderListOfEvents() {
    $("select").empty();

    $.ajax({
        url: TBA_BASE_URL + "/events/" + (new Date()).getFullYear() + "/simple",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            for (var i in data) {
                var end_of_event_date = new Date();
                end_of_event_date.setFullYear(data[i].end_date.substring(0, 4));
                end_of_event_date.setMonth(parseInt(data[i].end_date.substring(5, 7)) - 1);
                end_of_event_date.setDate(data[i].end_date.substring(8, 10));

                if (new Date() <= end_of_event_date) {
                    $("select").append("<option>" + data[i].name + " (" + data[i].key + ")</option>");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });
}

function renderRankings() {
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event + "/rankings",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            $(".rankings table tbody").empty();

            if (data === undefined || data === null || data.length === 0 || data.rankings === undefined || data.rankings === null || data.rankings.length === 0) {
                $(".rankings table").hide();
                $(".no-rankings").show();
            } else {
                $(".no-rankings").hide();
                $(".rankings table").show();
                for (var ranking in data.rankings) {
                    $("#rankings table tbody").append(`<tr>
                            <td ${data.rankings[ranking].team_key === team ? "class='current-team'" : ""}>${data.rankings[ranking].rank}</td>
                            <td ${data.rankings[ranking].team_key === team ? "class='current-team'" : ""}>${data.rankings[ranking].team_key.substring(3)}</td>
                            <td ${data.rankings[ranking].team_key === team ? "class='current-team'" : ""}>${data.rankings[ranking].sort_orders[0]}</td>
                            <td ${data.rankings[ranking].team_key === team ? "class='current-team'" : ""}>${data.rankings[ranking].record.wins}-${data.rankings[ranking].record.losses}-${data.rankings[ranking].record.ties}</td>
                            <td ${data.rankings[ranking].team_key === team ? "class='current-team'" : ""}>${data.rankings[ranking].matches_played}</td>
                            <td ${data.rankings[ranking].team_key === team ? "class='current-team'" : ""}>${data.rankings[ranking].extra_stats[0]}</td>
                        </tr>`);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
            $(".rankings table").hide();
            $(".no-rankings").show();
        }
    });
}

function renderSchedule() {
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event + "/matches/simple",
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            $(".schedule table tbody").empty();

            if (data === undefined || data.length === 0) {
                $(".schedule table").hide();
                $(".no-schedule").show();
            } else {
                $(".no-schedule").hide();
                $(".schedule table").show();
                for (var match in data) {
                    if (data[match].alliances.red.team_keys.includes(team.toString()) || data[match].alliances.blue.team_keys.includes(team.toString())) {
                        $("#schedule table tbody").append(`<tr>
                                <td>${data[match].comp_level === "qm" ? "Quals " + data[match].match_number : (data[match].comp_level === "qf" ? "Quarters " + data[match].set_number + " Match " + data[match].match_number : (data[match].comp_level === "sf" ? "Semis " + data[match].set_number + " Match " + data[match].match_number : "Finals " + data[match].match_number))}</td>
                                <td class="red ${data[match].alliances.red.team_keys[0] === team ? "current-team" : ""}">${data[match].alliances.red.team_keys[0].substring(3)}</td>
                                <td class="red ${data[match].alliances.red.team_keys[1] === team ? "current-team" : ""}">${data[match].alliances.red.team_keys[1].substring(3)}</td>
                                <td class="red ${data[match].alliances.red.team_keys[2] === team ? "current-team" : ""}">${data[match].alliances.red.team_keys[2].substring(3)}</td>
                                <td class="blue ${data[match].alliances.blue.team_keys[0] === team ? "current-team" : ""}">${data[match].alliances.blue.team_keys[0].substring(3)}</td>
                                <td class="blue ${data[match].alliances.blue.team_keys[1] === team ? "current-team" : ""}">${data[match].alliances.blue.team_keys[1].substring(3)}</td>
                                <td class="blue ${data[match].alliances.blue.team_keys[2] === team ? "current-team" : ""}">${data[match].alliances.blue.team_keys[2].substring(3)}</td>
                                <td class="red-score ${data[match].winning_alliance === "red" ? "winner" : ""}">${data[match].alliances.red.score >= 0 ? data[match].alliances.red.score : "---"}</td>
                                <td class="blue-score ${data[match].winning_alliance === "blue" ? "winner" : ""}">${data[match].alliances.blue.score >= 0 ? data[match].alliances.blue.score : "---"}</td>
                            </tr>`);
                    }
                }
            }

            sortSchedule();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
            $(".schedule table").hide();
            $(".no-schedule").show();
        }
    });
}

function renderWebcasts() {
    $.ajax({
        url: TBA_BASE_URL + "/event/" + event,
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            $(".webcasts ul").empty();
            $(".webcasts .tab-content").empty();

            if (data === undefined || data.webcasts === undefined || data.webcasts.length === 0) {
                $(".webcasts ul").hide();
                $(".webcasts .tab-content").hide();
                $(".no-webcasts").show();
            } else {
                $(".no-webcasts").hide();
                $(".webcasts ul").show();
                $(".webcasts .tab-content").show();
                for (var webcast in data.webcasts) {
                    if (data.webcasts[webcast].type === "twitch" || data.webcasts[webcast].type === "youtube") {
                        $(".webcasts ul").append(`
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#webcast-${(parseInt(webcast) + 1)}" role="tab">Webcast ${(parseInt(webcast) + 1)}</a>
                                </li>
                            `);

                        $(".webcasts .tab-content").append(`
                                <div class="tab-pane fade" id="webcast-${(parseInt(webcast) + 1)}" role="tabpanel">
                                    <iframe
                                        src="${data.webcasts[webcast].type === "twitch" ? "//player.twitch.tv/?channel=" : "//www.youtube.com/embed/"}${data.webcasts[webcast].channel}"
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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
            $(".webcasts ul").hide();
            $(".webcasts .tab-content").hide();
            $(".no-webcasts").show();
        }
    });
}

function setTeamNumberAndEvent() {
    if ($("input").val() === "" || $("select").val() === "") {
        alert("All fields must be filled");
        return;
    }

    team = "frc" + $("input").val();
    event = $("select").val().substring($("select").val().indexOf("(") + 1, $("select").val().indexOf(")"));

    verifyTeamInEvent(function() {
        window.location.href = window.location.href.split("?")[0] + "?team=" + team + "&event=" + event;
        // $(".no-team-event-selected").hide();
        // $(".half").show();
        // render();
    })
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
function verifyTeamInEvent(callback) {
    $.ajax({
        url: TBA_BASE_URL + "/team/" + team + "/events/" + (new Date()).getFullYear(),
        type: "GET",
        headers: {
            "X-TBA-Auth-Key": X_TBA_Auth_Key
        },
        success: function(data) {
            for (var i in data) {
                if (data[i].key === event) {
                    callback();
                    return;
                }
            }

            alert("Team is not in event");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseText);
        }
    });
}