import { SET_TODAY_RESERVATION } from "../actions/types";

const seatReservationReducer = (state = [], action)=> {
  switch (action.type) {
    case SET_TODAY_RESERVATION:
      return action.payload ;
    default:
      return state;
  }
}
export default seatReservationReducer;