const { StatusCodes } = require("http-status-codes");
const ClassQueryBuilder = require("../../classes/services/class_query_builder");
const Booking = require('../schema/booking');

async function verifyBookingSuccess(req, res) {
    const bookingId = req.session.bookingId;
    const bookingDetailsFromDoc = await Booking.findOne({ _id: bookingId });
    if (bookingDetailsFromDoc) {
        const query = new ClassQueryBuilder().filterByClassId(bookingDetailsFromDoc.classId).includeChef().onlyFirstIndex();
        const classData = await query.run();
        return res.status(StatusCodes.OK).json({ bookingDetails: bookingDetailsFromDoc, classData: classData });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'not found' });
}

module.exports = verifyBookingSuccess;