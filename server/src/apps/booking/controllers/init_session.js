const { StatusCodes } = require("http-status-codes");
const Booking = require('../schema/booking');
const ValidateBookingDetails = require('../services/validate_booking_details');
const isEmpty = require('../../../helpers/is_empty');
const ClassQueryBuilder = require('../../classes/services/class_query_builder');

/**
 * This controller runs the system that is responsible for storing a client's booking
 * details in a session.
 * 
 * A session is a way to persistently store data belonging to a client on the server.
 * @link https://en.wikipedia.org/wiki/Session_(computer_science)
 * 
 * This initializing booking session system is responsible for
 *      1. Correctly formatting the client's booked class time
 *      2. Validating the client's booking details
 *      3. Saving the validated booking details in the session
 */
async function initSession(req, res) {
    let bookingDetailsFromBody = req.body;
    const bookingDetails = {
        ...bookingDetailsFromBody,
        selectedClassDateTime: new Date(bookingDetailsFromBody.selectedClassDateTime)
    };


    const errors = await validate(bookingDetails);
    if (!isEmpty(errors))
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });

    req.session.bookingDetails = Booking(bookingDetails);
    req.session.save();

    return res.status(StatusCodes.OK).send('ok');
}

async function validate(bookingDetails) {
    const query = new ClassQueryBuilder().filterByClassId(bookingDetails.classId).includeSchedule().onlyIncludeBookableTimeSlots().onlyFirstIndex();
    const classData = await query.run();
    const validateBookingDetailsService = new ValidateBookingDetails(bookingDetails, classData);
    const errors = await validateBookingDetailsService.validate();
    return errors;
}

module.exports = initSession;