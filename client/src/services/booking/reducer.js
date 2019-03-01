import {
    LOAD_ClASS_DATA_SUCCESS,
    SELECT_CLASS_FOR_BOOKING,
    SUBMIT_BOOKING_FAILED,
    SUBMIT_BOOKING_SUCCESS,
    UPDATE_BOOKING_DETAILS,
} from './types';

const initialBookingDetails = {
    classId: '',
    timeSlotId: '',
    grandTotal: 0.00,
    tax: 0.00,
    subTotal: 0.00,
    devicesTotal: 0.00,
    mealKitsTotal: 0.00,
    mealKitsBooked: false,
    bookingSize: 0.00,
    selectedClassDateTime: null,
    customerFirstName: '',
    customerLastName: '',
    companyName: '',
    customerEmail: '',
}

const initialState = {
    bookingDetails: initialBookingDetails,
    bookingErrors: {},
}


function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_CLASS_FOR_BOOKING:
            return {
                ...state,
                classData: action.value
            }
        case LOAD_ClASS_DATA_SUCCESS:
            return {
                ...state,
                classData: action.value,
                bookingDetails: {
                    ...state.bookingDetails,
                    classId: action.value._id,
                }
            }
        case SUBMIT_BOOKING_SUCCESS:
            return {
                ...state,
                bookingDetails: {},
            }
        case SUBMIT_BOOKING_FAILED:
            return {
                ...state,
                bookingErrors: action.value
            }
        case UPDATE_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    ...action.value
                }
            }
        default:
            return state;
    }
}

export default bookingReducer;