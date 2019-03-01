import {
    SHARE_CONFIRMATION,
    VERIFY_BOOKING_SUCCESS,
} from '../../constants/api-constants';
import didCorsFail from '../../helpers/cors-failed';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function verifyBookingSuccess() {
    const response = await feastHeroAxios.get(VERIFY_BOOKING_SUCCESS, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    return response;
}

export async function sendConfirmations(emails) {
    const response = await feastHeroAxios.post(SHARE_CONFIRMATION, { 'emails': emails }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    return response;
}