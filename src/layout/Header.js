import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { logout,/*findParts*/} from "../actions/securityActions";
import {useStore,useSelector,useDispatch} from "react-redux";
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { BiLogOut as ExitToAppRoundedIcon} from "react-icons/bi";
import { BsFillPersonFill as HomeIcon } from "react-icons/bs";
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
  header:{

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
            <StyledLink to="/profile"
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
