class NumberValidator {
    static validate(value) {
        if (!value)
            return 'not a number'
        if (typeof value === Number)
            return null;
        if (isNaN(value))
            return 'not a number';
        return null;
    }
}

module.exports = NumberValidator;