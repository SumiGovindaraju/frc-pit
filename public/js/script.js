const LOCAL_STORAGE_KEY = "The Blue Alliance API Cache";
const TBA_BASE_URL = "https://www.thebluealliance.com/api/v3";
const X_TBA_Auth_Key = "83kBcUgRuDvJ1XLVXpB2ROeuRAzHoWpX9IRiWkRuwv8B9CryAlc3izY3ZXVOD4Hm";

var errorAlertTimeout = null;
(function (proxied) {
    window.alert = function () {
        $(".error-alert-div").hide();
        $('.error-alert').text(arguments[0]);
        $(".error-alert-div").show();
        clearTimeout(errorAlertTimeout);
        errorAlertTimeout = setTimeout(function () {
            $(".error-alert-div").hide();
        }, 7500);
    };
})(window.alert);

async function showStatisticsModal(event, team_key) {
    cache = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (cache != undefined && cache.events != undefined && cache.events[event] != undefined) {
        if (team_key && cache.events[event].teams[team_key] == undefined) {
            if (!navigator.onLine) {
                alert("Team data not cached. FRC Pit is offline.");
                return;
            }
        } else {
            $(".modal-title").text(cache.events[event].teams[team_key].name);
            $(".modal-rookie-year").text(cache.events[event].teams[team_key].rookie_year);
            $(".modal-location").text(cache.events[event].teams[team_key].location);

            $(".modal-event-status").html(cache.events[event].teams[team_key].status);
            $(".carousel-inner").html("<p>FRC Pit is offline. Images cannot be rendered right now.</p>");
        }
    } else if (!navigator.onLine) {
        alert("Event data not cached. FRC Pit is offline.");
        return;
    }

    if (cache.events[event] === undefined) {
        cache.events[event] = { "teams": {}, "awards": {}, "rankings": {}, "matches": {}, "webcasts": {}, "statistics": {} };
    }

    if (team_key && cache.events[event].teams[team_key] === undefined) {
        cache.events[event].teams[team_key] = { "awards": {}, "matches": {}, "photos": [], "name": "", "rookie_year": 0, "status": "", "location": "" };
    }

    var promises = [];
    if (navigator.onLine) {
        promises.push($.ajax({
            url: TBA_BASE_URL + "/team/" + team_key,
            type: "GET",
            headers: {
                "X-TBA-Auth-Key": X_TBA_Auth_Key
            },
            success: function (data) {
                cache.events[event].teams[team_key].name = "Team " + data.team_number + ": " + data.nickname;
                cache.events[event].teams[team_key].rookie_year = data.rookie_year;
                cache.events[event].teams[team_key].location = (data.city !== null && data.city !== undefined ? data.city + ", " : "") + data.country;

                $(".modal-title").text(cache.events[event].teams[team_key].name);
                $(".modal-rookie-year").text(cache.events[event].teams[team_key].rookie_year);
                $(".modal-location").text(cache.events[event].teams[team_key].location);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseText);
                alert("Team not found on The Blue Alliance");
                return;
            }
        }));

        promises.push($.ajax({
            url: TBA_BASE_URL + "/team/" + team_key + "/event/" + event + "/status",
            type: "GET",
            headers: {
                "X-TBA-Auth-Key": X_TBA_Auth_Key
            },
            success: function (data) {
                cache.events[event].teams[team_key].status = data.overall_status_str;

                $(".modal-event-status").html(cache.events[event].teams[team_key].status);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseText);
            }
        }));

        promises.push($.ajax({
            url: TBA_BASE_URL + "/team/" + team_key + "/media/" + event.substring(0, 4),
            type: "GET",
            headers: {
                "X-TBA-Auth-Key": X_TBA_Auth_Key
            },
            success: function (data) {
                cache.events[event].teams[team_key].photos = [];
                for (var media in data) {
                    if (data[media].direct_url !== undefined && data[media].direct_url !== "" && (data[media].type === "cdphotothread" || data[media].type === "instagram-image" || data[media].type === "imgur")) {
                        cache.events[event].teams[team_key].photos.push(data[media].direct_url.substring(data[media].direct_url.indexOf("//")));
                    }
                }

                $(".carousel-inner").empty();
                for (var photo in cache.events[event].teams[team_key].photos) {
                    $(".carousel-inner").append(`
                        <div class="carousel-item">
                            <img src="${cache.events[event].teams[team_key].photos[photo]}" alt="Robot Media Not Found" style="max-width: 100%; max-height: 350px; display: block; margin: auto;"/>
                        </div>
                    `);
                }

                $(".carousel-inner").children().first().addClass("active");
                if ($(".carousel-inner").children().length === 0) {
                    $(".carousel-inner").hide();
                    $(".robot-images-title").html("<b>No Robot Images Available</b>");
                } else {
                    $(".robot-images-title").html("<b>Robot Images:</b>");
                    $(".carousel-inner").show();
                }

                $(".carousel").carousel();
                $(".modal-event-status").html(cache.events[event].teams[team_key].status);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.responseText);
            }
        }));
    }

    $(".modal-tba-profile").attr("href", "https://www.thebluealliance.com/team/" + team_key.substring(3) + "/" + event.substring(0, 4));
    $(".modal-tba-profile").text(team_key.substring(3));
    await Promise.all(promises);

    modalTeam = team_key;
    $("#statistics-modal").modal("show");
    $('#statistics-modal').on('hidden.bs.modal', function () {
        $("#statistics-modal").modal("hide");
        $(".modal-title").text("Loading...");
        $(".modal-rookie-year").text("Loading...");
        $(".modal-location").text("Loading...");

        $(".modal-event-status").html("Loading...");
        $(".carousel-inner").html("Loading...");
        modalTeam = "";
    });
}