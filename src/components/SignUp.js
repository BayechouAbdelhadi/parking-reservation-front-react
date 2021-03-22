import React ,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';
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
    backgroundColor:'white',
    padding:10,
    borderRadius:'3%',
    boxShadow:' 0px 0px 5px 1px',
    opacity:'80%',
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
  disable: {
    backgroundColor: 'lightgray',
  },
  error:{
    color:'red',
    fontWeight:'bold',
    fontSize:16
  }
}));

const  SignUp =() =>{
    const classes = useStyles();
    const store =useStore();
    const [registrationState,setregistrationState]=useState({username: "",password: "",fullName:"",confirmPassword:"",roles:'user',errors: {}});
    const [shoudDisableSignUp,setShoudDisableSignUp]=useState(false);
    const errors=useSelector(state=>state.errors);
    const history =useHistory();

    useEffect(()=>{
      errors && setregistrationState({...registrationState,errors:errors });
    },[errors]);

    const onChange =(e)=>{
      setregistrationState({ ...registrationState,[e.target.name]: e.target.value });
    }
    const onSubmit =(e)=> {
      setShoudDisableSignUp(true);
      e.preventDefault();
      const registrationRequest = {
        fullName:registrationState.fullName,
        username: registrationState.username,
        password: registrationState.password,
        confirmPassword:registrationState.confirmPassword,
        roles:registrationState.roles
      };
      store.dispatch(createNewUser(registrationRequest,history,setShoudDisableSignUp));
    }

  return (
    <Container  maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
        اشتراك
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="الاسم الكامل "
            name="fullName"
            autoComplete="fullName"
            autoFocus
            onChange={onChange}
          />
          {errors.fullName && (
                    <div className={classes.error} >{registrationState.errors.fullName}</div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="عنوان البريد الإلكتروني"
            name="username"
            autoComplete="email"
            type="email"
            autoFocus
            onChange={onChange}
          />
          {errors.username && (
                    <div className={classes.error} >{registrationState.errors.username}</div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمه السر"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />{errors.password && (
            <div className={classes.error} >{registrationState.errors.password}</div>
  )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="تأكيد كلمة السر"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={onChange}
          />
          {registrationState.errors.confirmPassword && (
                    <div className={classes.error} >{registrationState.errors.confirmPassword}</div>
                  )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={shoudDisableSignUp?classes.disable:classes.submit}
            disabled={shoudDisableSignUp}
          >
            {shoudDisableSignUp?<div style={{color:"brown"}}>....جاري التوصيل بالخادم </div>:'اشتراك '}

          </Button>
        </form>
      </div>
    </Container>
  );
}
export default SignUp;