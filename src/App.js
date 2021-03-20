import React, { useState,useEffect } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from './securityUtils/SecureRoute';
import SignIn  from './components/SignIn';
import SignUp  from './components/SignUp';
import Profile from './components/Profile';
import Header from './layout/Header';
import Footer from './layout/Footer.js';
import Wrapper from './layout/Wrapper.js';
import BodyWrapper from './layout/BodyWrapper.js';
import {IconContext} from 'react-icons';

import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Map from './components/Map';

import './App.css';

const App =()=> {
  useEffect(()=>{
    store.subscribe(()=>console.log(store.getState()));
  });
  return(
      <Provider store={store}>
        <IconContext.Provider value={{size:40,color:"white"}}>
              <Router>
                <Wrapper>
                  <Header/>
                  <BodyWrapper>
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route  exact path="/register" component={SignUp} />
                        <SecuredRoute exact path="/book" component={Map} />
                        <SecuredRoute exact path="/profile" component={Profile} />
                    </Switch>
                  </BodyWrapper>
                {//<Footer/>
                } 
                </Wrapper>
              </Router>
              </IconContext.Provider>
      </Provider>

  )
}
export default App;
