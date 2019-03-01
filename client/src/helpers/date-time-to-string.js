import moment from 'moment-timezone';

export default function dateTimeToString(dateTime) {
    return moment
        .utc(dateTime)
        .tz('US/Eastern')
        .format('dddd, MMMM D, YYYY - hh:mm a z')
}