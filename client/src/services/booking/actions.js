import asAction from '../../helpers/as-redux-action';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import history from '../../history';
import { initBookingDetailsSession } from './api';
import datesTimesAsOption from '../../helpers/dates-times-as-options';
import { getClassForBooking } from '../classes/api';

import * as validators from '../../validators';

import {
    LOAD_ClASS_DATA_SUCCESS,
    SELECT_CLASS_FOR_BOOKING,
    SUBMIT_BOOKING_FAILED,
    SUBMIT_BOOKING_SUCCESS,
    UPDATE_BOOKING_DETAILS,
} from './types';

export function updateBookingDetails(bookingDetails) {
    return asAction(UPDATE_BOOKING_DETAILS, bookingDetails)
}

function loadClassDataSuccess(classData) {
    return asAction(LOAD_ClASS_DATA_SUCCESS, classData);
}

function submitBookingSuccess() {
    return asAction(SUBMIT_BOOKING_SUCCESS);
}

function submitBookingFailed(bookingErrors) {
    return asAction(SUBMIT_BOOKING_FAILED, bookingErrors);
}

export function chooseClassForBooking(classData) {
    return asAction(SELECT_CLASS_FOR_BOOKING, classData);
}

export function loadClassDataForBooking(classId) {
    return async (dispatch, getState) => {
        let classData;

        if (!getState().booking.classData) {
            classData = await getClassForBooking(classId);
            if (classData.error)
                throw new Error('Failed to load class data');
        }
        else
            classData = getState().booking.classData;

        dispatch(loadClassDataSuccess(classData));
    }
}

export function submitBooking() {
    return async (dispatch, getState) => {
        const bookingDetails = getState().booking.bookingDetails;
        const scheduleOptions = datesTimesAsOption(getState().booking.classData.schedule);

        const validateBookingDetails = () => {
            let errors = {};
            errors['bookingSize'] = validators.BookingSizeValidator.validate(bookingDetails.bookingSize)
            errors['classDateTime'] = validators.DateTimeValidator.validate(bookingDetails.selectedClassDateTime, scheduleOptions);
            errors['customerEmail'] = validators.EmailValidator.validate(bookingDetails.customerEmail);
            errors['customerFirstName'] = validators.NameValidator.validate(bookingDetails.customerFirstName);
            errors['customerLastName'] = validators.NameValidator.validate(bookingDetails.customerLastName);
            errors['companyName'] = validators.NotEmptyValidator.validate(bookingDetails.companyName);
            errors['mealKitsBooked'] = validators.BooleanValidator.validate(bookingDetails.mealKitsBooked);
            return errors;
        }

        const handleInitBookingSessionError = (errorResponse) => {
            if (requestErrorHasAdditionalInfo(errorResponse))
                dispatch(submitBookingFailed(errorResponse.data.errors))
            else {
                const error = { error: 'Error creating checkout session, please try again later' }
                dispatch(submitBookingFailed(error))
                return;
            }
        }

        let errors = validateBookingDetails();
        if (!errorsAreEmpty(errors)) {
            dispatch(submitBookingFailed(errors))
            return;
        }

        const initBookingSessionResult = await initBookingDetailsSession(bookingDetails);
        if (initBookingSessionResult.error) {
            handleInitBookingSessionError(initBookingSessionResult.error);
            return;
        }

        dispatch(submitBookingSuccess());

        history.push('/checkout');
    }
}