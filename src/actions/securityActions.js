import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER ,SET_PARTS} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import authHeader from "../securityUtils/authorisationHeader"

export const createNewUser = (newUser, history) => async dispatch => 
{
  
    await axios({
      url:"https://park-reservation.herokuapp.com/api/users/register",
      method:'post',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: newUser})
    .then(response=>{
      history.push("/");
      dispatch(
      {
        type: GET_ERRORS,
        payload: {}
      });
    }).catch(error=>{
      console.log(error);
      dispatch(
      {
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios({
      url:"https://park-reservation.herokuapp.com/api/users/login",
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
    dispatch({
      type:SET_CURRENT_USER ,
      payload: decoded
    });
  } catch (err) 
  {
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
/*
export const saveScore = score => async dispatch => {
    // post => Login Request
    await axios(
    {
      url:'/api/parts',
      method:'post',
      data: score
    }
    ).catch(err=>
    {
      dispatch(
        {
          type: GET_ERRORS,
          payload: err.response.data
        });
      
    });
}

export const findParts = () => async dispatch => {
     await axios.get("/api/parts",{"Authorisation":authHeader})
    .then(response=>{
      const parts = response.data;
      dispatch({
      type:SET_PARTS ,
      payload: parts 
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
  */