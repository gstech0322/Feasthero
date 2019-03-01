class DateTimeValidator {
    static validate(dateTime, validDateTimes) {
        if (!dateTime)
            return 'cannot be empty';

        if (!validDateTimes.find(validDateTime => dateTime === validDateTime.target.value))
            return 'invalid date and time';

        return null;
    }
}

export default DateTimeValidator;