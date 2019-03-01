import feastHeroAxios from '../axios/feast-hero-axios';

import {
    INIT_BOOKING_DETAILS_SESSION,
    IS_BOOKING_SESSION_ACTIVE,
} from '../../constants/api-constants';

export async function initBookingDetailsSession(bookingDetails) {
    const response = await feastHeroAxios.post(INIT_BOOKING_DETAILS_SESSION, bookingDetails, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}

export async function isBookingSessionActive() {
    const response = await feastHeroAxios.get(IS_BOOKING_SESSION_ACTIVE, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error;
}