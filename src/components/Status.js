import React,{useState,useEffect} from 'react';
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative"    justifyContent="center" p={1}>
        <div  style={{textAlign:'center',marginBottom:'10px',fontWeight:'bold',fontSize:14}}>
            {4-props.value/25>0?<b style={{color:'green'}}>Status today : availlable </b>:<b style={{color:'red'}}>Status today : not availlable</b>}
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
    const [nbBookedSeats,setNbBookedSeats]=useState(0);
    useEffect(async ()=>{
            await axios.get(`${SERVER_URL}/api/seats/${seat}`,{"Authorisation":authHeader})
            .then(response=>{
                const reservations = response.data;
                setNbBookedSeats(reservations.length);
                console.log(reservations.length);
            })
            .catch(error=>{
                //console.log(error);
            });

    },[]);
    return(
        <CircularProgressWithLabel value={nbBookedSeats*25} size={150}  color ={nbBookedSeats===4?'secondary':'primary'}/>
    );
}

export default Status ;
