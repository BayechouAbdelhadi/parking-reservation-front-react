import React ,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { createNewUser } from "../actions/securityActions";
import {useStore} from "react-redux";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width:'100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  SignUp =() =>{
    const classes = useStyles();
    const store =useStore();
    const [registrationState,setregistrationState]=useState({username: "",password: "",fullName:"",confirmPassword:"",roles:'user',errors: {}});
    const security=useSelector(state=>state.security);
    const errors=useSelector(state=>state.errors);
    const history =useHistory();

    useEffect(()=>{
      errors && setregistrationState({...registrationState,errors:errors });
    },[errors]);

    const onChange =(e)=>{
      setregistrationState({ ...registrationState,[e.target.name]: e.target.value });
    }
    const onSubmit =(e)=> {
      e.preventDefault();
      const registrationRequest = {
        fullName:registrationState.fullName,
        username: registrationState.username,
        password: registrationState.password,
        confirmPassword:registrationState.confirmPassword,
        roles:registrationState.roles
      };
      store.dispatch(createNewUser(registrationRequest,history));
    }

  return (
    <Container  maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name "
            name="fullName"
            autoComplete="fullName"
            autoFocus
            onChange={onChange}
          />
          {errors.fullName && (
                    <div >{registrationState.errors.fullName}</div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          {errors.username && (
                    <div >{registrationState.errors.username}</div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />{errors.password && (
            <div >{registrationState.errors.password}</div>
  )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirm your password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={onChange}
          />
          {registrationState.errors.confirmPassword && (
                    <div >{registrationState.errors.confirmPassword}</div>
                  )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
              <Link to="/" >
                Log In
              </Link>
        </form>
      </div>
    </Container>
  );
}
export default SignUp;