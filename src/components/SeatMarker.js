import React, { useEffect, useState } from "react";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import {Marker, Popup, Tooltip} from 'react-leaflet';
import Calendar from './Calendar';
import Status from './Status';
import { freeSeatIcon,nonFreeSeatIcon} from './Icon'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tooltip: {
        borderRadius: 10,
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        backgroundSize: 'cover',
        boxShadow: ' 0 0 5px 5px rgb(0, 94, 255)',

    },
    paper:{
        marginTop: 10, 
        padding:10,
        display: 'block'
    }

}));
export default function SeatMarker({seat}){
    const [nbBookedSeats,setNbBookedSeats]=useState(0);
    const classes=useStyles();
    useEffect(async ()=>{
            await axios.get(`${SERVER_URL}/api/seats/${seat.id}`,{"Authorisation":authHeader})
            .then(response=>{
                const reservations = response.data;
                setNbBookedSeats(reservations.length);
            })
            .catch(error=>{
                //console.log(error);
            });
    },[]);
    return(
        <Marker
            position={[seat.coordinates[1], seat.coordinates[0]]}
            icon={nbBookedSeats===4?nonFreeSeatIcon:freeSeatIcon}
            key={seat.id}
        >
            <Popup  key={seat.coordinates[1]}>
                <Calendar seat={seat.id} />
            </Popup>
            <Tooltip className={classes.tooltip} key={seat.coordinates[0]}>
                <Status nbBookedSeats={nbBookedSeats} />
            </Tooltip>

         </Marker>
    )
}
