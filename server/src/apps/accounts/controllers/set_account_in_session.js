const putAccountInSession = require('../../../helpers/put_account_in_session');
const { StatusCodes } = require('http-status-codes');

function setAccountInSession(req, res) {
    const account = req.body.account;
    putAccountInSession(req.session, JSON.parse(account));
    return res.status(StatusCodes.OK).json(account);
}

module.exports = setAccountInSession;