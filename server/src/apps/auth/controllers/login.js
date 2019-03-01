const LoginService = require('../services/login');
const { StatusCodes } = require('http-status-codes');
const putAccountInSession = require('../../../helpers/put_account_in_session');

async function login(req, res) {
    const loginData = req.body.loginData;
    const login = new LoginService(loginData);
    const result = await login.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result.account);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.response);
}


module.exports = login;