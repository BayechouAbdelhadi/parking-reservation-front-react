import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import SERVER_URL from  '../securityUtils/path';

export const createNewUser = (newUser, history,setShoudDisableSignUp) => async dispatch => 
{
  
    await axios({
      url:`${SERVER_URL}/api/users/register`,
      method:'post',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: newUser})
    .then(response=>{
      setShoudDisableSignUp(false);
      history.push("/");
      dispatch(
      {
        type: GET_ERRORS,
        payload: {}
      });
    }).catch(error=>{
      setShoudDisableSignUp(false);
      console.log(error);
      dispatch(
      {
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const login = (LoginRequest,setShoudDisableSignIn) => async dispatch => {
  try {
    // post => Login Request
    const res = await axios({
      url:`${SERVER_URL}/api/users/login`,
      method:'post',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: LoginRequest}
      );
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    setShoudDisableSignIn(false);
    dispatch({
      type:SET_CURRENT_USER ,
      payload: decoded
    });
  } catch (err) 
  { setShoudDisableSignIn(false);
    dispatch(
    {
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type:SET_CURRENT_USER ,
    payload: {}
  });
};
