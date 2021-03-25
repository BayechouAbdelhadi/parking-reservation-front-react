import React, { useEffect, useState ,useCallback} from "react";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import {Marker, Popup, Tooltip,useMapEvent} from 'react-leaflet';
import ParkingCalendar from './ParkingCalendar';
import { freeParkingIcon,nonFreeParkingIcon} from './Icon'
import { isWithinInterval } from "date-fns";

function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
}
function isWithinRanges(date, ranges) {
    return ranges.some(range => isWithinRange(date, range)||sameDate(date, range[0]) ||sameDate(date, range[1]));
}
function sameDate(dat1, dat2) {
    return dat1.getDate() === dat2.getDate() && dat1.getFullYear() === dat2.getFullYear() && dat1.getMonth() === dat2.getMonth()
}
function isBooked(date,ranges){
    return isWithinRanges(date, ranges) 
}
export default function ParkingMarker({parking}){

    const [booked,setBooked]=useState(false);
    useEffect(async ()=>{
            await axios.get(`${SERVER_URL}/api/parking/${parking.id}`,{"Authorisation":authHeader})
            .then(response=>{
                const ranges = response.data.map(res => {
                    const range = [new Date(res.startDate), new Date(res.endDate)];
                    return range;
                });
                console.log(isBooked(new Date((Date.now())),ranges));
                setBooked(isBooked(new Date((Date.now())),ranges));
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
