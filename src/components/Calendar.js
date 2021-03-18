import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SlotTime from './SlotTime';
import { saveSeatReservation } from "../actions/reservationActions";
import {useStore} from "react-redux";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'red',
  },
}));

const Calendar1=({seat})=>{
  const store =useStore();
  const history = useHistory();
  const [dateValue, setDateValue] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected,setTimeSelected]=useState(false);
  const [timeValue,setTimeValue]=useState(0);

  const [dataCompleted,setDataCompleted]=useState(false);

  const classes=useStyles();
  function onDateSelcted(e){
    setDateValue(new Date(e));
    setDateSelected(true);
  }
  const backToCalendar=()=>{
    setDateSelected(false);
    setTimeSelected(false);
    setDataCompleted(false);

  }
  const showDetails=()=>{
    setDataCompleted(true);
  }
  const book=()=>{
    const seatReservation ={
      seat:seat,
      time:timeValue,
      reservation_date:`${dateValue.getFullYear()}-${dateValue.getMonth()+1}-${dateValue.getDate()}`
    }
    store.dispatch(saveSeatReservation(seatReservation,history));

  }
  
  return (
   <div >
     {
      dateSelected ? (
        !dataCompleted?
          (
          <div style={{ margin:'0 auto'}}> 
            <p className={classes.root}>Pick a time</p>
            <SlotTime  setTimeSelected={setTimeSelected} setTimeValue={setTimeValue} seat={seat} dateValue={dateValue}/>
          </div>
          ):
          (<>
          <p className={classes.root}>Details</p>
          <h3>You have choosen to book for :</h3>
          <h3>{`${dateValue.getDate()}-${dateValue.getMonth()+1}-${dateValue.getFullYear()}`}</h3>
          <h3>{getTime(timeValue)}</h3>
          </>
          )
      ):
      (<>
        <p className={classes.root}>Pick a date</p>
        <Calendar
          onChange={(e)=>onDateSelcted(e)}
          value={dateValue}
          minDate={new Date((Date.now()))}
        />
      </>
      )}
      <div style={{display:"flex",marginTop:15}}>
          {dateSelected && <Button onClick={backToCalendar}
          variant="contained" 
          color="primary" 
          disableElevation 
          style={{marginLeft:10,marginRight:80,background:'black'}}
          >
          Back</Button> 
          }
          {timeSelected&& 
          (
          dataCompleted? 
          <Button 
            onClick={book}
            variant="contained" 
            color="primary" 
            disableElevation 
            style={{marginLeft:10,marginButtom:20,background:'green'}}>Confirm
          </Button> :
          <Button 
            onClick={showDetails}
            variant="contained" 
            color="primary" 
            disableElevation 
            style={{marginLeft:10,marginButtom:20,background:'green'}}>Book
          </Button> 
          )}
        </div>
    </div>
  );
}
export default Calendar1;

const getTime=(index)=>{
  switch(index){
    case 1:return "from 8h to 10h" ;
    case 2:return "from 10h to 12h" ;
    case 3 :return "from 14h to 16h" ;
    case 4:return "from 16h to 18h" ;
    default:return "";
  }



}