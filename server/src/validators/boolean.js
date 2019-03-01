class BooleanValidator {
    static validate(value) {
        if (BooleanValidator._isNotABoolean(value))
            return 'not true or false'
    }

    static _isNotABoolean(value) {
        return value !== true && value !== false
    }
}

module.exports = BooleanValidator;