const { CHEF } = require('../constants/app_constants');
const { StatusCodes } = require('http-status-codes');

function verifyUserIsChef(req, res, next) {
    return req.session.account.type === CHEF
        ?
        next()
        :
        res.status(StatusCodes.FORBIDDEN).json({ errors: { error: 'unauthorized' } });
}

module.exports = verifyUserIsChef;