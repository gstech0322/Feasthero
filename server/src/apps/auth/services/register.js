const { StatusCodes } = require("http-status-codes");

const ValidateRegistrationData = require('./validate_registration_data');
const { CUSTOMER } = require("../../../constants/app_constants");
const AccountFactory = require("../../accounts/account_factory");
const isEmpty = require("../../../helpers/is_empty");

class RegistrationService {
    constructor(registrationData) {
        this.registrationData = registrationData;
    }

    async run() {
        const errors = this._validate();
        if (!isEmpty(errors))
            return { status: StatusCodes.BAD_REQUEST, response: { errors: errors } };

        if (await ValidateRegistrationData.accountDoesExist(this.registrationData.email))
            return { status: StatusCodes.CONFLICT, response: { errors: { error: "account already exists" } } };

        const account = this._createAccount()
        await this._saveToDatabase(account);

        return { status: StatusCodes.OK, account: account };
    }

    _validate() {
        const registrationDataValidator = new ValidateRegistrationData(this.registrationData);
        const errors = registrationDataValidator.validate();
        return errors;
    }

    _createAccount() {
        let account = AccountFactory.getAccount(CUSTOMER, this.registrationData);
        account.set({ password: this.registrationData.passwordOne });
        return account;
    }

    async _saveToDatabase(account) {
        await account.save()
        return account;
    }
}

module.exports = RegistrationService;