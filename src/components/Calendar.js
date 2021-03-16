import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SlotTime from './SlotTime';

const popupContent = {
  textAlign: "center",
  height: "300",
  width:"300",
  border:"solid green",
  padding:"20",
  marginTop: "30px",
};
const Calendar1=()=>{
  const [dateValue, setDateValue] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected,setTimeSelected]=useState(false);

  function onDateSelcted(e){
    setDateValue(new Date(e));
    setDateSelected(true);
  }
  const backToCalendar=()=>{
    setDateSelected(false);
    setTimeSelected(false);
  }
  return (
   <div  style={popupContent}>
     {dateSelected ? 
      (<div style={{ margin:'0 auto'}}> 
        <p>Pick a time</p>
        <SlotTime  setTimeSelected={setTimeSelected}/>
        <div style={{display:"flex",margin:"0 auto"}}><Button onClick={backToCalendar}>Back to Calendar</Button> {timeSelected&& <Button>Book</Button> }</div>
      </div>
      ):
      (<>
        <p>Pick a date</p>
        <Calendar
          onChange={(e)=>onDateSelcted(e)}
          value={dateValue}
          minDate={new Date((Date.now()))}
        />
      </>
      )}
    </div>
  );
}
export default Calendar1;