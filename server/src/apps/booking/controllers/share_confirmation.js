const { StatusCodes } = require("http-status-codes");

const ClassQueryBuilder = require("../../classes/services/class_query_builder");
const shareConfirmationService = require('../services/share_confirmation');

/**
 * This controller runs the system for sharing a booking confirmation
 * 
 * This share confirmation system is responsible for
 *      1. Generating booking confirmation emails and sending them to a list of emails provided by the client
 */
async function shareConfirmation(req, res) {
    const bookingDetails = req.session.bookingDetails;
    const query = new ClassQueryBuilder(bookingDetails.classId).filterByClassId().includeChef().onlyFirstIndex();
    const classData = await query.run();
    const emailsToSendTo = req.body.emails;

    return await shareConfirmationService(emailsToSendTo, bookingDetails, classData)
        .then((_) => res.status(StatusCodes.OK).json('ok'))
        .catch((err) => { console.log(err); return res.status(StatusCodes.BAD_REQUEST).json({ error: 'error' }) });
}

module.exports = shareConfirmation;