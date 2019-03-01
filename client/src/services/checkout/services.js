import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';
import history from '../../history';
import { bookClass, getBookingDetailsFromSession } from './api';


export async function loadBookingDetails() {
    const bookingDetails = await sessionActiveWrapper(getBookingDetailsFromSession);
    if (bookingDetails.status === statusEnum.sessionNotActive)
        throw new Error('Session not active')


    if (bookingDetails.status === statusEnum.error)
        throw new Error(bookingDetails.error);

    return bookingDetails;
}

export async function checkout(card, stripe, recaptchaValue) {
    const cardTokenResponse = await stripe.createToken(card)

    if (cardTokenResponse.error) {
        const error = { payment: cardTokenResponse.error.message }
        throw error;
    }

    const bookingResponse = await sessionActiveWrapper(bookClass, cardTokenResponse.token.id, recaptchaValue);
    if (bookingResponse.status === statusEnum.error) {
        if (requestErrorHasAdditionalInfo(bookingResponse.error))
            throw bookingResponse.error.data['errors'];
        else {
            const error = { payment: 'Payment failed, please try again' };
            throw error;
        }
    }

    if (bookingResponse.status === statusEnum.sessionNotActive) {
        const error = { booking: 'Session not active' }
        throw error;
    }

    history.push('booking-success');
}