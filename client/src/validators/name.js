class NameValidator {
    static validate(name) {
        if (!name) {
            return 'cannot be empty';
        } else {
            if (!name.match(/^[a-zA-Z\s]+$/))
                return 'only letters';
        }
        return null;
    }
}

export default NameValidator;