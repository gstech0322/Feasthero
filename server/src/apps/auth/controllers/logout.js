const { StatusCodes } = require("http-status-codes");

function logout(req, res) {
    req.session.destroy();
    res.status(StatusCodes.OK).json('ok');
}

module.exports = logout;