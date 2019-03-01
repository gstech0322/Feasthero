import store from '../redux/store/index';
import history from '../history';

import { newError } from '../services/feasthero/actions';
import { BOOKING_SESSION_NOT_ACTIVE_ERROR } from '../constants/app-constants';
import { isBookingSessionActive } from '../services/booking/api';


export default async function checkBookingSessionActive() {
    const response = await isBookingSessionActive();
    if (!response) {
        store.dispatch(newError(BOOKING_SESSION_NOT_ACTIVE_ERROR));
        history.push('/');
        return false;
    }
    return true;
}