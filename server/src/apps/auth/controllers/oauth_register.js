const { StatusCodes } = require("http-status-codes");
const OAuthRegistrationService = require("../services/oauth_register");
const putAccountInSession = require('../../../helpers/put_account_in_session');

async function oAuthRegister(req, res) {
    const { token } = req.body;

    const oAuthRegistrationService = new OAuthRegistrationService(token);
    const registrationResult = await oAuthRegistrationService.run();

    if (registrationResult.status === StatusCodes.OK) {
        putAccountInSession(req.session, registrationResult.account);
        return res.status(registrationResult.status).json(registrationResult.account);
    }

    res.status(registrationResult.status).json(registrationResult.response);
}

module.exports = oAuthRegister;