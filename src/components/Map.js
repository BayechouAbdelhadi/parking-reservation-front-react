import React, { useCallback, useState } from "react";
import { MapContainer, useMapEvent, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet/dist/leaflet.css'
import IconButton from '@material-ui/core/IconButton';
import { FiKey } from "react-icons/fi";
import seats from '../data/seats';
import parkings from '../data/parkings';
import area from '../data/area';
import Key from "./Key";
import SeatMarker from "./SeatMarker";
import ParkingMarker from "./ParkingMarker";

const transparentOption = { color: 'red', fillColor: "none" }

const Content = () => {

    return (
        <>
            {seats.map(seat => {
                return <SeatMarker seat={seat} />
            })
            }
            {parkings.map(parking => {
                return <ParkingMarker parking={parking} />
            })
            }
            <Polygon pathOptions={transparentOption} positions={area} />
        </>)
}
const Map = () => {
    const [showKey, setShowKey] = useState(true);
    return (
        <div>
            {showKey &&
                <div style={{ backgroundColor: 'white' }}>
                    <Key />
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
                <KeyControll showKey={showKey} setShowKey={setShowKey} />
            </MapContainer>
        </div>
    );
}
function KeyControll({ showKey, setShowKey }) {

    const onClick = useCallback(
        (e) => {
            setShowKey(!showKey);
        },
    )
    useMapEvent('click', onClick)
    return <div className="leaflet-control leaflet-bar  leaflet-top leaflet-right" style={{
        backgroundColor: 'rgb(3, 36, 252)', opacity: '0.50'
    }}>
        <IconButton>
            <FiKey size="25" />
        </IconButton>
    </div>
}
export default Map;