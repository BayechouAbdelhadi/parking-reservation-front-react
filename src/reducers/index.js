
import securityReducer from './securityReducer';
import seatReservationReducer from './seatReservationReducer';

import errorReducer from './errorReducer';
import {combineReducers} from 'redux';

const rootReducer=combineReducers({
    errors: errorReducer,
    security:securityReducer,
    todayReservation:seatReservationReducer
});

export default rootReducer;