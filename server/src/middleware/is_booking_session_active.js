function isBookingDetailsSessionActive(req, res, next) {
    if (!req.session.bookingDetails)
        return res.status(408).json({ error: 'booking session not active' });

    next();
}

module.exports = isBookingDetailsSessionActive;