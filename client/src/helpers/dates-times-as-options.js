import dateTimeToString from './date-time-to-string';

/**
 * format all classes schedule date times from server so they can be displayed.
 * 
 * @param {Array<DateTime>} datesTimes - date times to display as options
 * @returns {Array<Object>} - date times as objects
 */
export default function datesTimesAsOption(datesTimes) {
    let dateTimesResults = [];
    for (let dateTimeElem of datesTimes) {
        const dateTimeString = dateTimeToString(dateTimeElem.dateTime);
        dateTimesResults.push(
            {
                target: {
                    name: 'selectedClassDateTime',
                    value: dateTimeElem.dateTime,
                    id: dateTimeElem._id,
                },
                label: dateTimeString
            }

        );

    }
    return dateTimesResults;
}