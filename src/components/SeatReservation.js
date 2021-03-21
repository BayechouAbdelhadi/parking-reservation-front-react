import React,{ useEffect,useState } from "react";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from  '../securityUtils/path';
import Card from "./Card"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {  const classes = useStyles();

  const [reservations,setReservations]=useState([]);
  useEffect( ()=>{
    async function fetch() {
      await axios.get(`${SERVER_URL}/api/seats`,{"Authorisation":authHeader})
      .then(response=>{
          setReservations(response.data);
      })
      .catch(error=>{
          console.log(error);
      });
    }
      fetch();
  },[]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {reservations.map(reservation=> (
            <Grid key={reservation.id} spacing={2} >
              <Card reservation={reservation} seat/>
    
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}