import asAction from '../../helpers/as-redux-action';
import { getAllClassesForBooking } from './api';
import { LOAD_ALL_CLASSES_SUCCESS } from './types';

function loadClassesSuccess(classes) {
    return asAction(LOAD_ALL_CLASSES_SUCCESS, classes)
}

export function loadClasses() {
    return async (dispatch, getState) => {
        if (getState().classes.allClasses)
            return getState().classes.allClasses;

        const classes = await getAllClassesForBooking();
        if (classes.error)
            throw new Error('Error loading classes, please try again.')

        dispatch(loadClassesSuccess(classes));

        return classes;
    }
}