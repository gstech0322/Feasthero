class PasswordValidator {
    static validate(password) {
        if (!password)
            return 'password must not be empty'
    }

    static passwordsEqual(passOne, passTwo) {
        if (passOne !== passTwo)
            return 'passwords do not match';
    }
}

module.exports = PasswordValidator;