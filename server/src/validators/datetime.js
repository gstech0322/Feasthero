class DateTimeValidator {
    static validate(dateTime, validDateTimes) {
        if (!dateTime)
            return 'date time cannot be empty';

        if (!validDateTimes.find(validDateTime => {
            return validDateTime.dateTime.toString() === dateTime.toString();
        })) {
            return 'invalid date time';
        }
    }
}

module.exports = DateTimeValidator;