import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import SecuredRoute from './securityUtils/SecureRoute';
import SignIn  from './components/SignIn';
import SignUp  from './components/SignUp';
import Profile from './components/Profile';
import Header from './layout/Header';
import Wrapper from './layout/Wrapper.js';
import BodyWrapper from './layout/BodyWrapper.js';
import {IconContext} from 'react-icons';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Map from './components/Map';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage:"url('/background.jpg')",
    backgroundRepeat: 'repeat-y',
    backgroundSize: '100% 1000px',
    minHeight:1000  
  }
})
);
const App =()=> {
  const classes=useStyles();
  return(
      <Provider store={store}>
        <IconContext.Provider value={{size:40,color:"white"}}>
              <Router>
                <Wrapper className={classes.container}>
                  <Header/>
                  <BodyWrapper>
                      <Switch >
                          <Route exact path="/" component={Map} />
                          <Route exact path="/signin" component={SignIn} />

                          <Route  exact path="/register" component={SignUp} />
                          <SecuredRoute exact path="/book" component={Map} />
                          <SecuredRoute exact path="/profile" component={Profile} />
                      </Switch>
                  </BodyWrapper>
                {/*<Footer/>
                */
                } 
                </Wrapper>
              </Router>
              </IconContext.Provider>
      </Provider>

  )
}
export default App;
