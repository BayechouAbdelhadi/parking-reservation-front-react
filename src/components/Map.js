import React, { useCallback, useState } from "react";
import { MapContainer, useMapEvent, TileLayer, Marker, Popup, Tooltip, Polygon } from 'react-leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet/dist/leaflet.css'
import IconButton from '@material-ui/core/IconButton';
import { FiKey } from "react-icons/fi";
import Calendar from './Calendar';
import Status from './Status';
import seats from '../data/seats';
import parkings from '../data/parkings';
import area from '../data/area';
import { makeStyles } from '@material-ui/core/styles';
import Key from "./Key";
import ParkingCalendar from "./ParkingCalendar";

import { seatIcon, freSeatIcon, parkingIcon } from './Icon'
const transparentOption = { color: 'red', fillColor: "none" }
const useStyles = makeStyles((theme) => ({
    tooltip: {
        borderRadius: 10,
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        backgroundSize: 'cover',
        boxShadow: ' 0 0 5px 5px rgb(0, 94, 255)',

    },
    paper:{
        marginTop: 10, 
        padding:10,
        display: 'block'
    }

}));

const Content = () => {
    const classes = useStyles();
    function handleMouseOut(e) {
        e.target.closePopup();
    }
    function handleMouseOver(e) {
        e.target.openPopup();
    }
    return (
        <>
            {seats.map(seat => {
                return <Marker
                    position={[seat.coordinates[1], seat.coordinates[0]]}
                    onMouseOver={(e) => handleMouseOver(e)}
                    onMouseOut={(e) => handleMouseOut(e)}
                    icon={seatIcon}
                    key={seat.id}
                >
                    <Popup style={{ height: "400px" }} key={seat.coordinates[1]}>
                        <Calendar seat={seat.id} />
                    </Popup>
                    <Tooltip className={classes.tooltip} key={seat.coordinates[0]}>
                        <Status seat={seat.id} />
                    </Tooltip>

                </Marker>
            })
            }
            {parkings.map(parking => {
                return <Marker position={[parking.coordinates[1], parking.coordinates[0]]}
                    icon={parkingIcon} key={parking.id}
                >
                    <Popup style={{ height: "400px" }} key={parking.coordinates[1]}>
                        <ParkingCalendar park={parking.id} />
                    </Popup>
                    <Tooltip key={parking.coordinates[0]}> Park</Tooltip>
                </Marker>
            })
            }
            <Polygon pathOptions={transparentOption} positions={area} />
        </>)
}
const Map = () => {
    const classes = useStyles();
    const [showKey, setShowKey] = useState(false);
    return (
        <div>
            {showKey &&
                <div style={{ backgroundColor: 'white' }}>
                    <div style={{ margin: '0 auto' ,fontWeight:'bold',fontSeize:18}}> state for today</div>
                        <Key/>
                </div>
            }
            <MapContainer
                center={[24.790813855392256, 46.741996280426456]}
                zoom={window.innerWidth < 600 ? 18 : 20}
                scrollWheelZoom={false}
                style={{ height: 1000 }}
                fullscreenControl={true}
    
            >
                <TileLayer

                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Content />
                <KeyControll showKey={showKey} setShowKey={setShowKey}/>
            </MapContainer>
        </div>
    );
}
function KeyControll({showKey,setShowKey}){

    const onClick = useCallback(
        (e) => {
          setShowKey(!showKey);
        },
      )
      useMapEvent('click', onClick)
    return <div className="leaflet-control leaflet-bar  leaflet-top leaflet-right" style={{ backgroundColor: 'rgb(3, 36, 252)' ,    opacity:'0.75'
}}>
    <IconButton>
        <FiKey  size="25" />
    </IconButton>
</div>
}
export default Map;