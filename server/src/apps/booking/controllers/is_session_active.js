/**
 * Check if booking details are currently stored in the session
 */
function isSessionActive(req, res) {
    if (!req.session.bookingDetails)
        return res.status(408).json({ error: 'booking session not active' });

    return res.status(200).json('ok');
}

module.exports = isSessionActive;