import { combineReducers } from 'redux';

import bookingReducer from '../../services/booking/reducer';
import authReducer from '../../services/auth/reducer';
import chefReducer from '../../services/chef/reducer';
import blogReducer from '../../services/blog/reducer';
import classesReducer from '../../services/classes/reducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    auth: authReducer,
    chef: chefReducer,
    blog: blogReducer,
    classes: classesReducer
})

export default rootReducer;