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
//import {resetDifference,resetIteration,clearAnswers,enableStart,start,endPart,resetAnswer,resetScore} from '../actions/actions';



const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
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
    color: '#80FF80',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: "#000",
   },
  },
  header:{
    //background: '#848382',//'linear-gradient(#B03A2E, #F8C471)',
    background: 'linear-gradient(#feb47b,antiquewhite,#feb47b)',
    color:'white',
    fontFamily:'times-new-roman',
    opacity:'0.75'
  },
  title: {
    flexGrow: 1,
    color:'black',
    fontWeight :'bold',
    fontSize:30,
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
          <Typography edge="start" variant="h6" className={classes.title } >
            <StyledLink to="/book" onClick ={reset}
            >
              GeoGame
            </StyledLink>
          </Typography>
          {validToken ?
          <>
            <StyledLink to="/profile" onClick={showProfile}
            >
              <Button className={classes.profileButton} >{user.fullName}</Button>
            </StyledLink>
            <StyledLink  to="/"  onClick={handleLogout}
            >
                <Button className={classes.logOutButton}>Logout</Button>
            </StyledLink>
          </>:
          <>
            <StyledLink  to="/" >
              <Button className={classes.login}>Log In </Button>
            </StyledLink>
            <StyledLink  to="/register" >
              <Button className={classes.register}>Sign Up</Button>
            </StyledLink>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default  ButtonAppBar;
