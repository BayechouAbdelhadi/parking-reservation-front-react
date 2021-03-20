import React,{ useEffect,useState } from "react";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import Card from "./Card"

export default  function SeatReservation(){
    const [reservations,setReservations]=useState([1,2,3,4,5,6]);
    useEffect(async ()=>{
        await axios.get(`${SERVER_URL}/api/seats`,{"Authorisation":authHeader})
        .then(response=>{
            setReservations(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
    },[]);

    return(
        <div>
            {
                reservations.map(reservation=>{
                    return <Card reservation={reservation} seat/>
                })
            }
        </div>
    );
}