const moment = require('moment-timezone');

function dateTimeToMoment(dateTime) {
    return moment
        .tz(
            dateTime,
            'dddd, MMMM D, YYYY - hh:mm a z',
            "US/Eastern"
        )
}

module.exports = dateTimeToMoment;