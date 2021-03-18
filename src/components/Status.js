import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { findTodayReservation } from "../actions/reservationActions";
import {useStore,useSelector} from "react-redux";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root:{
        textAlign:'center',
        justifyContent:'center',
        //backgroundColor:'antiquewhite',
        padding:'10px',
       // border :'solid brown',
        //borderRadius:'8%' ,
        height:200,
        width:200
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
function CircularProgressWithLabel(props) {
    return (
      <Box position="relative"    justifyContent="center" p={1}>
        <div  style={{textAlign:'center',marginBottom:'10px'}}>
            <b>Staus today :{`${ 4-props.value/25>0?'availlable':'not availlable'} ` }</b>
        </div>
        {props.value>0 &&<CircularProgress variant="determinate" {...props} />}
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        { props.value>0?`${props.value}%`:''} 
        </Box>
      </Box>
    );
  }
const Status =({seat})=>{
    const classes=useStyles();
    const store=useStore();
    const [todayReservation,seTodayReservation] = useState([]);
    const [nbBookedSeats,setNbBookedSeats]=useState(0);
    useEffect(async ()=>{
        await axios.get(`${SERVER_URL}/api/seats/${seat}`,{"Authorisation":authHeader})
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
        
        <CircularProgressWithLabel value={nbBookedSeats*25} size={150}  color ={nbBookedSeats===4?'secondary':'primary'}/>

    );
}

export default Status ;
/*<div>
            {nbBookedSeats<4?
            <h3>{ 4-nbBookedSeats==1? `There is one  free seat `: `there are ${ 4-nbBookedSeats} free seats `} for today</h3>
            :<><h2>There are no free seats for today</h2>  <h3>but you can still book for another day</h3></>}
        </div><div className={classes.progress}>
                <Bar nbBookedSeats={nbBookedSeats}><div className={classes.text} >{nbBookedSeats*25}%</div></Bar>
            </div>*/ 