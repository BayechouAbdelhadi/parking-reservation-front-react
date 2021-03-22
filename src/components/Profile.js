import React,{useState} from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Box  from '@material-ui/core/Box';
import  { Tabs, Tab, Content } from "../layout/Tab";
import SeatReservation from './SeatReservation'
import  ParkingReservation from "./ParkingReservation";


const useStyles = makeStyles({
  wrapper:{
    overFlowY:'scroll',
    width: '100%',
    maxHeight:500,
    margin:'0 auto',
    marginTop:10,
    OverflowY:'scroll',
  },
});

function Profile() {
    const classes = useStyles();
    const fullName =useSelector(state=>state.security.user.fullName);
    const [active, setActive] = useState(0);
    const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
    return (
        <Box className={classes.wrapper} >
            
            <div className="App">
              <h2> {fullName} مرحبا</h2>
              <h3>هنا يمكنك تفقد عمليات الحجز التي قمت بها</h3>

              <Tabs>
                <Tab onClick={handleClick} active={active === 0} id={0}>
                مقعد
                </Tab>

                <Tab onClick={handleClick} active={active === 1} id={1}>
                موقف
                </Tab>
              </Tabs>
              <>
                <Content active={active === 0}>
                  <SeatReservation/>
                </Content>
                <Content active={active === 1}>
                  <ParkingReservation/>
                </Content>
            </>
            </div>
        </Box>
);





        
}

export default Profile;