class BooleanValidator {
    static validate(value) {
        if (value !== true && value !== false)
            return 'must be checked or unchecked';

        return null;
    }
}

export default BooleanValidator;