import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    border:'solid',
    borderRadius:15
  },
}));
const slots=[
{key:1,startTime:"8:00",endTime:"10:00"},
{key:2,startTime:"10:00",endTime:"12:00"},
{key:3,startTime:"14:00",endTime:"16:00"},
{key:4,startTime:"16:00",endTime:"18:00"},

];
 const SlotTime=({setTimeSelected,setTimeValue,seat,dateValue}) =>{
  const classes = useStyles();
  const [selected , setSelected] = useState("");
  const [todayReservation,seTodayReservation] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleChange(e,index){
    setSelectedIndex(index);
    setTimeSelected(true);
    setTimeValue(index);
  }
  useEffect(async ()=>{
    console.log(`${dateValue.getFullYear()}-${dateValue.getMonth()+1}-${dateValue.getDate()}`);
    await axios(
      { 
        url:`https://park-reservation.herokuapp.com/api/seats/${seat}`,
        Authorisation:authHeader,
        method:"post",
        data:{date:`${dateValue.getFullYear()}-${dateValue.getMonth()+1}-${dateValue.getDate()}`}
    })
    .then(response=>{
        const reservations = response.data;
        console.log(reservations);
        seTodayReservation(reservations);        
    })
    .catch(error=>{
        console.log(error);
    });
},[dateValue]);
  return (
    <List dense className={classes.root} >
      {slots.map((slot) => {
        const labelId = `chose a slot`;
        return (
          <ListItem key={slot.key} button
          selected={selectedIndex === slot.key}
          onClick={(e)=>handleChange(e,slot.key)}
          disabled={todayReservation.filter(item=>item.time===slot.key).length>0?true:false}
          >
            <ListItemText id={slot.key} primary={`${slot.startTime}-${slot.endTime}`} align="center"/>
          </ListItem>
        );
      })}
    </List>
  );
}
export default SlotTime;