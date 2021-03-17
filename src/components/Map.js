import  React,{ useEffect,useState }from "react";
import { MapContainer, useMapEvents,TileLayer, Marker, Popup ,Tooltip,Polygon} from 'react-leaflet';
//import {useSelector,useDispatch} from 'react-redux';
//import {endPart,showMarkers,incrementDifference} from '../actions/actions';
//import {haversineDistance}from '../util/drawData.js';
import Calendar from './Calendar';
import Status from './Status';
import seats from '../data/seats';
import parkings from '../data/parkings';
import area from '../data/area';
import {seatIcon,freSeatIcon,parkingIcon} from './Icon'
const transparentOption = { color: 'red',fillColor:"none" }
const Map=()=>{
    function handleMouseOut(e){
        e.target.closePopup();
    }
    function handleMouseOver(e){
        e.target.openPopup();
    }
    return(
        <MapContainer 
        center={[ 24.791658318888238,46.74198403820229 ]}
         zoom={20} 
         scrollWheelZoom={false} 
         style={{width: '1833px', height: '700px'}}  
        > 
            <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
            />
        {seats.map(seat=>{
            return <Marker 
            position={[seat.coordinates[1],seat.coordinates[0]]} 
            onMouseOver={(e)=>handleMouseOver(e)}
            onMouseOut={(e)=>handleMouseOut(e)}
              icon={freSeatIcon}
            >
                <Popup style={{ height:"400px"}}>
                    <Calendar/>
                </Popup>
                <Tooltip> <Status/></Tooltip>

            </Marker>
        })    
        }
        {parkings.map(parking=>{
            return <Marker position={[parking.coordinates[1],parking.coordinates[0]]} icon={parkingIcon}>
                <Popup style={{ height:"400px"}}>
                    <Calendar/>
                </Popup>
                <Tooltip> This is a park</Tooltip>
            </Marker>
        })    
        }
        <Polygon pathOptions={transparentOption} positions={area} />

        </MapContainer>

    );
}
export default Map;