const ProcessBookingService = require('../services/process_class_booking');
const { StatusCodes } = require("http-status-codes");

/**
 * This controller runs the system that is responsible for processing a booking.
 * 
 * The booking system is responsible for
 *      1. Saving the customers booking details from their session to the database
 *      2. Update the class's schedule to make the newly booked slot unavailable
 *      3. Saving the newly saved booking's id to the session
 *      4. Processing their payment with Stripe
 */
async function processBooking(req, res) {
    let bookingDetails = req.session.bookingDetails;

    const bookingService = new ProcessBookingService(bookingDetails, req.body.cardTokenId)
    const bookingResult = await bookingService.book();

    if (bookingResult.statusCode === StatusCodes.OK) {
        putBookingIdInSession(req.session, bookingResult);
    }

    return res.status(bookingResult.statusCode).json(bookingResult.errors);
};

function putBookingIdInSession(session, bookingResult) {
    session.bookingId = bookingResult.bookedClassId;
    session.save();
}


module.exports = processBooking