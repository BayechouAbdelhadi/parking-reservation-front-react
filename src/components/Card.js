import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getTime} from "../util/formatTime";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 300,
    marginTop:20,
    marginRight:5,
    border:'4px',
    textAlign:'left'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
});

export default function SimpleCard({reservation,seat}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
        <CardContent>
            <div variant="h5" component="h2" gutterBottom>
            {bull} <b>Id of seat </b>: {seat ?reservation.seat:reservation.park}
            </div>
            { seat ?
              <>
              <div variant="h5" component="h3">
              {bull} <b>Reservation date : </b>{reservation.reservationdate}
              </div>
              <div variant="h5" component="h3">
              {bull} <b>Reservation time : </b>{getTime(reservation.time)}
              </div>
              </>:
              <>
              <div variant="h5" component="h3">
              {bull} <b>Reservation start date : </b>{reservation.startDate}
              </div>
              <div variant="h5" component="h3">
              {bull} <b>Reservation end Date : </b>{reservation.endDate}
              </div>
              </>
            }
      </CardContent>
    </Card>
  );
}