import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { findTodayReservation } from "../actions/reservationActions";
import {useStore,useSelector} from "react-redux";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"



const useStyles = makeStyles((theme) => ({
    root:{
        textAlign:'center',
        justifyContent:'center',
        backgroundColor:'antiquewhite',
        padding:'10px',
        border :'solid brown',
        borderRadius:'8%' 
    },
    progress: {
        width: '105px',
        height: '25px',
        margin:'0 auto',
        border:'double',
    },
    bar: {
        width: '1%',
        height: '30px',
        backgroundColor: 'green',
      },
      text:{
          color:"white",
          fontSize:12,
          fontWeight:'bold'   
      }
  }));
  
const Bar = styled.div`
background-color:${props=>props.nbBookedSeats<=2?'green':2<props.nbBookedSeats && props.nbBookedSeats <=3?'#FFA500':3<props.nbBookedSeats && props.nbBookedSeats<=4?'#800000':'grey'};
width:${props=>25*props.nbBookedSeats}px;
height:20px;
text-align:center;

`;
const Status =({seat})=>{
    const classes=useStyles();
    const store=useStore();
    const [todayReservation,seTodayReservation] = useState([]);
    const [nbBookedSeats,setNbBookedSeats]=useState(0);
    useEffect(async ()=>{
        await axios.get(`https://park-reservation.herokuapp.com/api/seats/${seat}`,{"Authorisation":authHeader})
        .then(response=>{
            const reservations = response.data;
            seTodayReservation(reservations);
            setNbBookedSeats(reservations.length);
            
        })
        .catch(error=>{
            console.log(error);
        });
    },[]);
    return(
        <div className={classes.root}>
            {seat}
            {nbBookedSeats<4?
            <h3>{ 4-nbBookedSeats==1? `There is one  free seat `: `there are ${ 4-nbBookedSeats} free seats `} for today</h3>
            :<><h2>There are no free seats for today</h2>  <h3>but you can still book for another day</h3></>
            }
            <div className={classes.progress}>
                <Bar nbBookedSeats={nbBookedSeats}><div className={classes.text} >{nbBookedSeats*25}%</div></Bar>
            </div>
        </div>


    );
}

export default Status ;