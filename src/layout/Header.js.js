import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { logout,/*findParts*/} from "../actions/securityActions";
import {useStore,useSelector,useDispatch} from "react-redux";
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { BiLogOut as ExitToAppRoundedIcon} from "react-icons/bi";
import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import {FaUserPlus} from "react-icons/fa";
import {FiLogIn} from "react-icons/fi";


const StyledLink = styled(Link)`

    text-decoration: none;
    color:white;
    &:focus, &:hover, &:visited, &:link, &:active,&:click{
        text-decoration: none;
    }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   // background: 'linear-gradient(#B03A2E, #F8C471)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logOutButton:{
    background: 'red',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginLeft:'5px',
    '&:hover': {
      background: "#000",
   },
  },
  profileButton:{
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'blue',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: "#000",
      color:'white'
   },
  },
  register:{
    background: 'green',
    borderRadius: 3,
    border: 0,
    color: '#80FF80',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginLeft:'5px',
    '&:hover': {
      background: "#000",
   },

  },
  login:{
    background: 'blue',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: "#000",
   },
   '&:click': {
    color: "white",
 },
  },
  header:{
     //background: 'linear-gradient(to right,rgb(3, 152, 252),white)',//'linear-gradient(#B03A2E, #F8C471)',
    //background: 'linear-gradient(#feb47b,antiquewhite,#feb47b)',
    background:'rgb(3, 36, 252)',
    color:'white',
    fontFamily:'times-new-roman',
    opacity:'0.75'
  },
  title: {
    flexGrow: 1,
    color:'white',
    fontWeight :'bold',
    fontSize:30,
    '&:click': {
      color: "white",
   }
}}));

const ButtonAppBar=()=> {
  const dispatch =useDispatch();
  const classes = useStyles();
  const store=useStore();
  const user=useSelector(state=>state.security.user);
  const validToken=useSelector(state=>state.security.validToken);
  const play=()=>{
    window.location.href = "/book";
  }
  const handleLogout=()=> {
    store.dispatch(logout());
    window.location.href = "/";
  }
  const showProfile=()=> {
    //store.dispatch(findParts());
    window.location.href = "/profile";
  }
  const reset=()=>{
    /*dispatch(resetDifference());
    dispatch(resetIteration(0));
    dispatch(clearAnswers());
    dispatch(enableStart());
    dispatch(endPart());
    dispatch(resetAnswer());
    dispatch(resetScore());
    dispatch(start());*/
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" className={classes.title }>
            <StyledLink to="/book" onClick ={reset} 
            >
              Reservation
            </StyledLink>
          </Typography>
          {validToken ?
          <>
            <StyledLink to="/profile" onClick={showProfile}
            >
              <IconButton  ><HomeIcon fontSize="large"/></IconButton>
            </StyledLink>
            <StyledLink  to="/"  onClick={handleLogout}
            >
                <IconButton ><ExitToAppRoundedIcon fontSize="large"/></IconButton>
            </StyledLink>
          </>:
          <>
            <StyledLink  to="/" >
              <IconButton ><FiLogIn/></IconButton>
            </StyledLink>
            <StyledLink  to="/register" >
              <IconButton ><FaUserPlus/></IconButton>
            </StyledLink>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default  ButtonAppBar;
