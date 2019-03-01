class NotEmptyValidator {
    static validate(value) {
        if (NotEmptyValidator._valueIsEmpty(value))
            return 'cannot be empty';
        return null;
    }

    static _valueIsEmpty(value) {
        return value === '' || value === null || value === undefined
    }
}

export default NotEmptyValidator;