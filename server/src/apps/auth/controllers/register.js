const RegistrationService = require('../services/register');
const { StatusCodes } = require("http-status-codes");
const putAccountInSession = require('../../../helpers/put_account_in_session');

async function register(req, res) {
    const regData = req.body.regData;
    const register = new RegistrationService(regData);
    const result = await register.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result.account);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.response);
}



module.exports = register;