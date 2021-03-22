import React, { useEffect, useState } from "react";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import {Marker, Popup, Tooltip} from 'react-leaflet';
import ParkingCalendar from './ParkingCalendar';
import { freeParkingIcon,nonFreeParkingIcon} from './Icon'
import { isWithinInterval } from "date-fns";


function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
}
function isWithinRanges(date, ranges) {
    return ranges.some(range => isWithinRange(date, range));
}
export default function ParkingMarker({parking}){

    const [booked,setBooked]=useState(false);

    useEffect(async ()=>{
            await axios.get(`${SERVER_URL}/api/parking/${parking.id}`,{"Authorisation":authHeader})
            .then(response=>{
                const reservations = response.data;
                const ranges = response.data.map(res => {
                    const range = [new Date(res.startDate), new Date(res.endDate)];
                    return range;
                });
                
                setBooked(isWithinRanges(new Date((Date.now())),ranges));
            })
            .catch(error=>{
                //console.log(error);
            });
    },[]);
    return(
        <Marker position={[parking.coordinates[1], parking.coordinates[0]]}
                    icon={booked?nonFreeParkingIcon:freeParkingIcon} key={parking.id}
                >
                    <Popup style={{ height: "400px" }} key={parking.coordinates[1]}>
                        <ParkingCalendar park={parking.id} />
                    </Popup>
                    <Tooltip key={parking.coordinates[0]}> موقف</Tooltip>
        </Marker>
    )
}
