const { StatusCodes } = require("http-status-codes");

function getBookingDetailsFromSession(req, res) {
    const bookingDetails = req.session.bookingDetails;

    if (!bookingDetails)
        return res.status(StatusCodes.REQUEST_TIMEOUT).json({ error: 'no booking details in session' });

    return res.status(StatusCodes.OK).json(bookingDetails);
}

module.exports = getBookingDetailsFromSession;