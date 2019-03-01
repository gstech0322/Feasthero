import {
    ADD_CLASS_SUCCESS,
    LOAD_CLASS_SUCCESS,
    SELECT_CLASS,
    DELETE_CLASS,
    ADD_TIME_SLOT,
    DELETE_TIME_SLOT,
    LOAD_ALL_CHEF_CLASSES_SUCCESS
} from "./types";

export default function chefReducer(state = [], action) {
    switch (action.type) {
        case LOAD_CLASS_SUCCESS:
            return {
                ...state,
                currentClass: action.value
            }
        case LOAD_ALL_CHEF_CLASSES_SUCCESS:
            return {
                ...state,
                allClasses: action.value
            }
        case ADD_CLASS_SUCCESS:
            return {
                ...state,
                showAddClassModal: false,
                allClasses: [...state.allClasses, action.value]
            }
        case SELECT_CLASS:
            return {
                ...state,
                currentClass: action.value
            }
        case DELETE_CLASS:
            const allClasses = state.allClasses.filter(function (class_) {
                return class_._id !== action.value;
            });

            return {
                ...state,
                allClasses
            }
        case ADD_TIME_SLOT:
            const { currentClass } = state;
            const updatedCurrentClass = {
                ...currentClass,
                schedule: [
                    ...currentClass.schedule, 
                    action.value
                ]
            }
            return {
                ...state,
                currentClass: updatedCurrentClass
            }
        case DELETE_TIME_SLOT:
            const scheduleWithoutDeletedTimeSlot = state.currentClass.schedule.filter(function (schedule) {
                return schedule._id !== action.value;
            });
                        
            return {
                ...state,
                currentClass: {
                    ...state.currentClass,
                    schedule: [
                        ...scheduleWithoutDeletedTimeSlot
                    ]
                }
            }
        default:
            return state;
    }
}