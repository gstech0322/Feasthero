const express = require('express');
const bookingRouter = express.Router();
const bookClass = require('./controllers/book_class');
const initSession = require('./controllers/init_session');
const getBookingDetailsFromSession = require('./controllers/get_booking_details_from_session');
const verifyBookingSuccess = require('./controllers/verify_booking_success');
const wait = require('../../middleware/async');
const isBookingDetailsSessionActive = require('../../middleware/is_booking_session_active');
const shareConfirmation = require('./controllers/share_confirmation');
const validateReCaptcha = require('../../middleware/validate_recaptcha');

bookingRouter.post('/book', validateReCaptcha, isBookingDetailsSessionActive, wait(bookClass));
bookingRouter.post('/init-session', initSession);
bookingRouter.get('/details-from-session', isBookingDetailsSessionActive, getBookingDetailsFromSession);
bookingRouter.get('/verify-success', isBookingDetailsSessionActive, wait(verifyBookingSuccess))
bookingRouter.get('/is-session-active', isBookingDetailsSessionActive);
bookingRouter.post('/share-confirmation', isBookingDetailsSessionActive, wait(shareConfirmation))

module.exports = bookingRouter;