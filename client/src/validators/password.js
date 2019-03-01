class PasswordValidator {
    static validate(password) {
        if (!password)
            return 'Enter your password';
        if (password.length < 8)
            return 'Must be longer than 8';
        if (password.search(/[0-9]/) < 0)
            return 'Must contain at least one digit';
        if (password.search(/[a-z]/i) < 0)
            return 'Must contain at least one letter';

        return null;
    }

    static passwordsEqual(passOne, passTwo) {
        if (passOne !== passTwo)
            return 'Passwords to not match';
        return null;
    }
}

export default PasswordValidator;