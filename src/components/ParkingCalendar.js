import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import IconButton from '@material-ui/core/IconButton';
import { AiFillBackward as ArrowBackIcon } from "react-icons/ai";
import { GiConfirmed as DoneOutlineIcon } from "react-icons/gi";
import { AiFillWarning as GiInterdiction } from "react-icons/ai";
import 'react-calendar/dist/Calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import { isWithinInterval } from "date-fns";
import { useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveParkingReservation } from "../actions/parkingReservationActions";
import axios from 'axios';
import authHeader from "../securityUtils/authorisationHeader"
import SERVER_URL from '../securityUtils/path';
import formatDate from "../util/formatDate";


function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
}
function isWithinRanges(date, ranges) {
    return ranges.some(range => isWithinRange(date, range));
}
function checkFirstDate(date, ranges) {
    return ranges.some(range => { return sameDate(date,range[0])});
}
function sameDate(dat1,dat2){
    return dat1.getDate()===dat2.getDate()&& dat1.getFullYear()===dat2.getFullYear()&&dat1.getMonth()===dat2.getMonth()
}
function rangeIntersection(selectedrange, disabledRange) {
    return selectedrange[0] < disabledRange[0] && selectedrange[1] > disabledRange[1];
}
const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        padding:10,
        maeginBottom:10,
        textAlign:'center'
    },
    validateButton:{
        marginBottom:5,
        marginRight:5
      }
}));
const ParkingCalendar = ({ park }) => {
    const classes = useStyles();
    const store = useStore();
    const history = useHistory();
    const [dateValue, setDateValue] = useState([]);
    const [datesSelected, setDatesSelected] = useState(false);
    const [disabledRanges, setDisabledRanges] = useState([]);
    const [errorRange, setErrorRange] = useState(false);

    function back() {
        setDatesSelected(false);
    }

    function tileDisabled({ date, view }) {
        if (view === 'month') {
            return isWithinRanges(date, disabledRanges)||checkFirstDate(date, disabledRanges);
        }
    }

    function dateSelected(e) {
        const selectedRane = [new Date(e[0]), new Date(e[1])];
        if (disabledRanges.some((range => rangeIntersection(selectedRane, range))))
            setErrorRange(true);
        else {
            setDateValue(selectedRane);
            setDatesSelected(true);
        }
    }

    function book() {
        const parkReservation = {
            park: park,
            start_reservation: formatDate(dateValue[0]),
            end_reservation: formatDate(dateValue[1])
        }
        store.dispatch(saveParkingReservation(parkReservation, history));
    }

    useEffect( () => {
        async function fetch(){
            await axios.get(`${SERVER_URL}/api/parking/${park}`, { "Authorisation": authHeader })
            .then(response => {
                const ranges = response.data.map(res => {
                    const range = [new Date(res.startDate), new Date(res.endDate)];
                    return range;
                });
                setDisabledRanges(ranges);
            })
            .catch(error => {
                console.log(error);
            });
        }
        fetch();
    }, []);
        

    return (
        <div>
            {
                datesSelected ?
                    <div style={{textAlign:'center'}}>
                        <p className={classes.root}>تفاصيل</p>
                        <h3>: لقد اخترت الحجز</h3>
                        <h3>{showDatesRange(dateValue)}</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15 }}>

                            <IconButton
                                onClick={back}
                                variant="contained"
                                color="primary"
                                disableElevation
                            >
                                <ArrowBackIcon color="red" />
                            </IconButton>
                            <IconButton
                                //onClick={book}
                                variant="contained"
                                color="primary"
                                disableElevation
                                className={classes.validateButton}
                            >
                                <DoneOutlineIcon color="green" onClick={book} />
                            </IconButton>
                        </div>
                    </div> :
                    <div>
                        <Calendar
                            onChange={dateSelected}
                            tileDisabled={tileDisabled}
                            minDate={new Date((Date.now()))}
                            //value={dateValue}
                            view="month"
                            selectRange
                        >
                        </Calendar>
                        {errorRange &&
                            <div style={{ color: "red", fontSize: 16, fontWeight: 'bold', dmarginTop: 20, display: "flex", justifyContent: "center", marginTop: 15 }} dir="rtl">
                                 لا يمكن!  <GiInterdiction color="red" onClick={book} variant="contained" />  اختر تاريخا اخر  
                    </div>
                        }
                    </div>
            }

        </div>
    )
}
export default ParkingCalendar;

function showDatesRange(dates) {
    return `من ${dates[0].getDate()}-${dates[0].getMonth() + 1}-${dates[0].getFullYear()} الى 
     ${dates[1].getDate()}-${dates[1].getMonth() + 1}-${dates[1].getFullYear()}
    `
}
function formatDateV2(dateValue) {
    return `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`
}

