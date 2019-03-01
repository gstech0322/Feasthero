const { StatusCodes } = require('http-status-codes');

function getAccount(req, res) {
    const account = req.session.account;
    return res.status(StatusCodes.OK).json(account);
}

module.exports = getAccount;