import React, { useState,useEffect } from 'react';
import Calendar from './components/Calendar';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import Wrapper from './layout/Wrapper.js';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Map from './components/Map';

import './App.css';

function App() {
  return(
    <Router>
      <Wrapper>
        <Header/> 
        <Map/>
        <Footer/>
      </Wrapper>
    </Router>
  )
}
export default App;
//<Calendar/>
