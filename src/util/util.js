var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMatchTimeInMS(match) {
    if (match.actual_time !== undefined && match.actual_time !== null) {
        return match.actual_time * 1000;
    }

    if (match.predicted_time !== undefined && match.predicted_time !== null) {
        return match.predicted_time * 1000;
    }

    return match.time * 1000;
}

module.exports.getMatchTimeInMS = getMatchTimeInMS;
module.exports.days = days;