const cleanErrors = require("../../../helpers/clean_errors");
const EmailValidator = require("../../../validators/email");
const NameValidator = require("../../../validators/name");
const PasswordValidator = require("../../../validators/password");
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');

class ValidateRegistrationData {
    constructor(registrationData) {
        this.registrationData = registrationData;
    }

    validate() {
        let errors = {}
        errors['email'] = this.email();
        errors['firstName'] = this.firstName();
        errors['lastName'] = this.lastName();
        errors['passwordOne'] = this.password();

        return cleanErrors(errors);
    }

    email() {
        return EmailValidator.validate(this.registrationData.email);
    }

    firstName() {
        return NameValidator.validate(this.registrationData.firstName);
    }

    lastName() {
        return NameValidator.validate(this.registrationData.lastName);
    }

    password() {
        const passwordsMatch = PasswordValidator.passwordsEqual(this.registrationData.passwordOne, this.registrationData.passwordTwo);
        if (passwordsMatch === true)
            return PasswordValidator.validate(this.registrationData.passwordOne)

        return passwordsMatch;
    }

    static async accountDoesExist(email) {
        return Boolean(await getAccountFromEmail(email));
    }

}

module.exports = ValidateRegistrationData;