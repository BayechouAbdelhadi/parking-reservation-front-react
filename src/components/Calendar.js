import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { AiFillBackward as ArrowBackIcon} from "react-icons/ai";
import { AiFillForward as ArrowForwardIosIcon} from "react-icons/ai";
import { GiConfirmed as DoneOutlineIcon } from "react-icons/gi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SlotTime from './SlotTime';
import { saveSeatReservation } from "../actions/reservationActions";
import {useStore} from "react-redux";
import { useHistory } from "react-router-dom";
import {getTime} from "../util/formatTime";
import formatDate from "../util/formatDate";



const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'red',
    textAlign:'center'
  },
  validateButton:{
    marginBottom:5,
    marginRight:5
  }
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
      reservation_date:formatDate(dateValue)
    }
    store.dispatch(saveSeatReservation(seatReservation,history));

  }
  
  return (
   <div style={{textAlign:'center'}} >
     {
      dateSelected ? (
        !dataCompleted?
          (
          <div style={{ margin:'0 auto'}}> 
            <p className={classes.root}>اختر التوقيت</p>
            <SlotTime  setTimeSelected={setTimeSelected} setTimeValue={setTimeValue} seat={seat} dateValue={dateValue}/>
          </div>
          ):
          (<>
          <p className={classes.root}>تفاصيل</p>
          <h3> : لقد اخترت الحجز </h3>
          <h3>{getTime(timeValue)}</h3>
          <h3>{`${dateValue.getDate()}-${dateValue.getMonth()+1}-${dateValue.getFullYear()}`}</h3>
          </>
          )
      ):
      (<>
        <p className={classes.root}>اختر التاريخ</p>
        <Calendar
          onChange={(e)=>onDateSelcted(e)}
          value={dateValue}
          minDate={new Date((Date.now()))}
          locale="en-US"
        />
      </>
      )}
      <div style={{display:"flex",justifyContent:"space-between",marginRight:0}}>

          {dateSelected && 
          <IconButton onClick={backToCalendar}
            variant="contained" 
            color="primary" 
            disableElevation 
            className={classes.backButton}
        >
          <ArrowBackIcon color="red"/>
          </IconButton> 
          }
          {timeSelected&& 
          (
          dataCompleted? 
          <IconButton 
            onClick={book}
            variant="contained" 
            color="primary" 
            disableElevation 
            className={classes.validateButton}
            >
              <DoneOutlineIcon color="green" />
           </IconButton> :
          <IconButton 
            onClick={showDetails}
            variant="contained" 
            color="primary" 
            disableElevation 
            >
              <ArrowForwardIosIcon  color="green"/> 
          </IconButton> 
          )}
        </div>
    </div>
  );
}
export default Calendar1;

