const OAuthLoginService = require('../services/oauth_login');
const { StatusCodes } = require('http-status-codes');
const putAccountInSession = require('../../../helpers/put_account_in_session');

async function oAuthLogin(req, res) {
    const { token } = req.body;
    const login = new OAuthLoginService(token)
    const result = await login.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result.account);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.errors);
}

module.exports = oAuthLogin;