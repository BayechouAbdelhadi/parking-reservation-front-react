import axios from "axios";
import { GET_ERRORS } from "./types";
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
