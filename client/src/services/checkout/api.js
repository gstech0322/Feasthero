import feastHeroAxios from '../axios/feast-hero-axios';

import {
    BOOK_CLASS,
    GET_BOOKING_DETAILS_FROM_SESSION
} from '../../constants/api-constants';
import didCorsFail from '../../helpers/cors-failed';

export async function bookClass(cardTokenId, recaptchaData) {
    const response = await feastHeroAxios.post(BOOK_CLASS, { 'cardTokenId': cardTokenId, 'recaptchaData': recaptchaData }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    return response;
}

export async function getBookingDetailsFromSession() {
    const response = await feastHeroAxios.get(GET_BOOKING_DETAILS_FROM_SESSION, { withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: didCorsFail(error) }));

    return response;
}
