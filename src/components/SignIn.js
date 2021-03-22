import React ,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { login } from "../actions/securityActions";
import {useStore} from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';



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
  disable: {
    backgroundColor: 'lightgray',
  },
  error:{
    color:'red',
    fontWeight:'bold',
    fontSize:16
  }
  ,
  Container:{
    backgroundColor:'white'
  }
  
}));

const  SignIn =() =>{
    const classes = useStyles();
    const store =useStore();
    const [loginState,setloginState]=useState({username: "",password: "",errors: {}});
    const security=useSelector(state=>state.security);
    const errors=useSelector(state=>state.errors);
    const [shoudDisableSignIn,setShoudDisableSignIn]=useState(false);
    const history =useHistory();

    useEffect(()=>{
      security.validToken && history.push("/book");

      errors && setloginState({...loginState,errors:errors });
      
    },[security,errors]);

    const onChange =(e)=>{
      setloginState({ ...loginState,[e.target.name]: e.target.value });
    }
    const onSubmit =(e)=> {
      setShoudDisableSignIn(true);
      e.preventDefault();
      const loginRequest = {
        username: loginState.username,
        password: loginState.password
      };
      store.dispatch(login(loginRequest,setShoudDisableSignIn));
    }
const redirect=()=>history.push('/register');

  return (
    <Container component="main" maxWidth="xs"className={classes.container} >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
        تسجيل الدخول
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="عنوان البريد الإلكتروني"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          {errors.username && (
                    <div className={classes.error} >{loginState.errors.username}</div>
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
          />
          {loginState.errors.password && (
                    <div className={classes.error}>{loginState.errors.password}</div>
                  )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="تذكرنى"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={!shoudDisableSignIn?classes.submit:classes.disable}
            disabled={shoudDisableSignIn}
          >
             {shoudDisableSignIn?<div style={{color:"brown"}}>....جاري التوصيل بالخادم </div>:'تسجيل الدخول '}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" >
                {"ليس لديك حساب؟ اشتراك"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default SignIn;