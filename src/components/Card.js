import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getTime } from "../util/formatTime";

const useStyles = makeStyles({
  root: {
    //  minWidth:"160px",
    marginTop: 20,
    marginRight: 5,
    marginLef: 5,
    border: '4px',
    textAlign: 'right',
    fontSize: "min(max(16px, 4vw), 18px)",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
});

export default function SimpleCard({ reservation, seat }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>

        {seat ?
          <>
            <div variant="h5" component="h2" gutterBottom>
              <b>رقم المقعد </b>: {reservation.seat}
            </div>
            <div variant="h5" component="h3">
              <b>تاريخ الحجز: </b>{reservation.reservationdate}
            </div>
            <div variant="h5" component="h3">
              <b>توقيت الحجز : </b>{getTime(reservation.time)}
            </div>
          </> :
          <>
            <div variant="h5" component="h2" gutterBottom>
              <b>رقم الموقف </b>: {reservation.park}
            </div>
            <div variant="h5" component="h3">
              <b>تاريخ بدايه الحجز : </b>{reservation.startDate}
            </div>
            <div variant="h5" component="h3">
              <b>تاريخ نهايه الحجز : </b>{reservation.endDate}
            </div>
          </>
        }
      </CardContent>
    </Card>
  );
}