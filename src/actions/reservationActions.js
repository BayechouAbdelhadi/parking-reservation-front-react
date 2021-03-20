import axios from "axios";
import { GET_ERRORS ,SET_TODAY_RESERVATION} from "./types";
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';

export const saveSeatReservation = (reservation,history) => async dispatch => {
    await axios(
    {
      url:`${SERVER_URL}/api/seats`,
      method:'post',
      Authorisation:authHeader,
      data: reservation
    }
    ).then(res=>{
      history.push('/profile');
    })
    .catch(err=>
    {
      dispatch(
        {
          type: GET_ERRORS,
          payload: err.response.data
        });
      
    });
}
export const findTodayReservation = (seat) => async dispatch => {
     await axios.get(`${SERVER_URL}/api/seats/${seat}`,{"Authorisation":authHeader})
    .then(response=>{
      const reservations = response.data;
      dispatch({
      type:SET_TODAY_RESERVATION ,
      payload: reservations 
      })
    })
    .catch(error=>{
      dispatch(
        {
          type: GET_ERRORS,
          payload: error.response.data
        });
    });
    
  }
