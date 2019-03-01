const { StatusCodes } = require("http-status-codes");
const Bcrypt = require("bcryptjs");
const EmailValidator = require('../../../validators/email');
const PasswordValidator = require('../../../validators/password');
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');
const cleanErrors = require('../../../helpers/clean_errors');
const isEmpty = require('../../../helpers/is_empty');

class LoginService {
    constructor(loginData) {
        this.loginData = loginData;
    }

    async run() {
        const errors = this.validate();
        if (!isEmpty(errors))
            return { status: StatusCodes.BAD_REQUEST, response: { errors: errors } }

        this.account = await getAccountFromEmail(this.loginData.email);
        if (!this.account)
            return { status: StatusCodes.NOT_FOUND, response: { errors: { email: 'email not found' } } };

        if (!this._passwordsMatch())
            return { status: StatusCodes.UNAUTHORIZED, response: { errors: { password: 'incorrect password' } } };

        return { status: StatusCodes.OK, account: this.account };
    }

    validate() {
        let errors = {};
        errors['email'] = EmailValidator.validate(this.loginData.email)
        errors['password'] = PasswordValidator.validate(this.loginData.password)
        return cleanErrors(errors);
    }


    _passwordsMatch() {
        return Bcrypt.compareSync(this.loginData.password, this.account.password);
    }
}

module.exports = LoginService;