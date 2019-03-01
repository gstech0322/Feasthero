const { StatusCodes } = require('http-status-codes');
const { CUSTOMER } = require('../../../constants/app_constants');
const AccountFactory = require('../../accounts/account_factory');
const getOAuthTicket = require('../helpers/get_oauth_ticket');
const ValidateRegistrationData = require('./validate_registration_data');

class OAuthRegistrationService {
    constructor(token) {
        this.token = token;
    }

    async run() {
        try {
            this.ticket = await getOAuthTicket(this.token)
        } catch (_) {
            return { status: StatusCodes.BAD_REQUEST, response: { errors: { error: 'invalid oauth token, please try again' } } }
        }

        if (await ValidateRegistrationData.accountDoesExist(this.ticket.getPayload().email))
            return { status: StatusCodes.CONFLICT, response: { errors: { error: 'account already exists' } } };

        const account = this._createAccount();
        await this._saveToDatabase(account);

        return { status: StatusCodes.OK, account: account };
    }

    _createAccount() {
        const accountData = this._getAccountData();
        const account = AccountFactory.getAccount(CUSTOMER, accountData);
        return account;
    }

    async _saveToDatabase(account) {
        await account.save();
    }

    _getAccountData() {
        const ticketPayload = this.ticket.getPayload();
        return {
            firstName: ticketPayload.given_name,
            lastName: ticketPayload.family_name,
            email: ticketPayload.email,
            password: '',
        }
    }

}

module.exports = OAuthRegistrationService;