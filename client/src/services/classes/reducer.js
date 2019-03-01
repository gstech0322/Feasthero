import { LOAD_ALL_CLASSES_SUCCESS } from "./types";

function classesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_ALL_CLASSES_SUCCESS:
            return {
                ...state,
                allClasses: action.value
            }
        default:
            return state;
    }
}

export default classesReducer;