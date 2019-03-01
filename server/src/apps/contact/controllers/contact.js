const { sendEmail, genMessage } = require('../services/email');
const { StatusCodes } = require("http-status-codes");

/**
 * This controller runs the system that is responsible for sending contact messages to FeastHero
 * 
 * The contact system is responsible for
 *      1. Sending an email to bookings@feasthero.com
 */
async function contact(req, res) {
    const { name, email, subject, message } = req.body;

    const msg = genMessage(name, email, message, subject);
    if ((await sendEmail(msg)) === false)
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: { error: 'error sending email' } });

    return res.status(StatusCodes.OK).json('ok');

}

module.exports = contact;