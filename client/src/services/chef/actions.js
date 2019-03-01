import asAction from '../../helpers/as-redux-action';
import {
    ADD_CLASS_SUCCESS,
    ADD_TIME_SLOT,
    LOAD_ALL_CHEF_CLASSES_SUCCESS,
    DELETE_CLASS,
    DELETE_TIME_SLOT,
    LOAD_CLASS_SUCCESS, 
    SELECT_CLASS
} from "./types";
import { allChefsClasses, getClassForChef } from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import { newClass } from '../classes/api';
import classDataFromObj from '../../helpers/class-data-from-state';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import { deleteClass as deleteClassRequest } from "../classes/api";
import history from '../../history'
import { addTimeSlot as addTimeSlotRequest, deleteTimeSlot as deleteTimeSlotRequest } from "../schedule/api";

import NotEmptyValidator from '../../validators/not-empty';
import BooleanValidator from '../../validators/boolean';
import NumberValidator from '../../validators/number';


function addClassSuccess(newClass) {
    return asAction(ADD_CLASS_SUCCESS, newClass);
}

function loadAllClassesSuccess(classes) {
    return asAction(LOAD_ALL_CHEF_CLASSES_SUCCESS, classes);
}

function loadClassSuccess(classData) {
    return asAction(LOAD_CLASS_SUCCESS, classData);
}

function deleteClassSuccess(id) {
    return asAction(DELETE_CLASS, id)
}

function addTimeSlotSuccess(timeSlot) {
    return asAction(ADD_TIME_SLOT, timeSlot);
}

function deleteTimeSlotSuccess(timeSlotId) {
    return asAction(DELETE_TIME_SLOT, timeSlotId)
}

export function selectClassForEdit(classData) {
    return asAction(SELECT_CLASS, classData);
}

export function loadAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();

        if (classes.error)
            throw classes.error;

        dispatch(loadAllClassesSuccess(classes));
    }
}

export function loadClass(classId) {
    return async (dispatch, getState) => {
        if (getState().chef.currentClass)
            return getState().chef.currentClass;
        const classData = await getClassForChef(classId);
        if (classData.error)
            throw classData.error;

        dispatch(loadClassSuccess(classData));

        return classData;
    }
}

export function addClass(classData) {
    return async (dispatch) => {
        const validateClassData = () => {
            let errors = {};

            errors['title'] = NotEmptyValidator.validate(classData.title);
            errors['description'] = NotEmptyValidator.validate(classData.description);
            errors['thumbnail'] = NotEmptyValidator.validate(classData.thumbnail);
            errors['costPerDevice'] = NumberValidator.validate(classData.costPerDevice);
            errors['duration'] = NumberValidator.validate(classData.duration);
            errors['mealKitCost'] = NumberValidator.validate(classData.mealKitCost);
            errors['hasMealKit'] = BooleanValidator.validate(classData.hasMealKit);

            return errors;
        }

        const errors = validateClassData();
        if (!errorsAreEmpty(errors))
            throw errors;


        const newClassResponse = await newClass(classDataFromObj(classData));
        const errorResponse = newClassResponse.errors;
        if (errorResponse) {
            if (requestErrorHasAdditionalInfo(errorResponse))
                throw errorResponse;
            else {
                const error = { error: 'Failed to add class, please try again' }
                throw error;
            }
        }

        dispatch(addClassSuccess(newClassResponse.data));

        return true;
    }
}

export function deleteClass(id) {
    return async (dispatch) => {
        const response = await deleteClassRequest(id);
        if (response.error) {
            if (requestErrorHasAdditionalInfo(response.error))
                throw response.error.data['errors'];
            else {
                const error = { error: 'Error deleting class' };
                throw error;
            }
        }

        dispatch(deleteClassSuccess(id))
        history.push('/account');
    }
}

export function addTimeSlot(classId, classDateTime) {
    return async (dispatch) => {
        const response = await addTimeSlotRequest(classId, classDateTime);
        if (!response) {
            const error = { error: 'error adding schedule' };
            throw error;
        }
        
        dispatch(addTimeSlotSuccess(response.timeSlot));
    }
}

export function deleteTimeSlot(timeSlotId, classId) {
    return async (dispatch) => {
        const response = await deleteTimeSlotRequest(timeSlotId, classId);
        if (response.error) {
            if (requestErrorHasAdditionalInfo(response.error))
                throw response.error.data['errors']
            else {
                const error = { error: 'Something went wrong...' };
                throw error;
            }
        }

        dispatch(deleteTimeSlotSuccess(timeSlotId));
    }
}