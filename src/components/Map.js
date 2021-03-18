import  React,{ useEffect,useState,useRef }from "react";
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

const Content =()=>{
    function handleMouseOut(e){
        e.target.closePopup();
    }
    function handleMouseOver(e){
        e.target.openPopup();
    }
    return(
        <>
        {seats.map(seat=>{
        return <Marker 
        position={[seat.coordinates[1],seat.coordinates[0]]} 
        onMouseOver={(e)=>handleMouseOver(e)}
        onMouseOut={(e)=>handleMouseOut(e)}
          //icon={freSeatIcon}
          key={seat.id}
        >
            <Popup style={{ height:"400px"}}  key={seat.coordinates[1]}>
                <Calendar seat={seat.id}/>
            </Popup>
            <Tooltip  key={seat.coordinates[0]}> <Status seat={seat.id}/></Tooltip>

        </Marker>
    })    
    }
    {parkings.map(parking=>{
        return <Marker position={[parking.coordinates[1],parking.coordinates[0]]} icon={parkingIcon} key={parking.id}>
            <Popup style={{ height:"400px"}}  key={parking.coordinates[1]}>
                <Calendar/>
            </Popup>
            <Tooltip  key={parking.coordinates[0]}> This is a park</Tooltip>
        </Marker>
    })    
    }
    <Polygon pathOptions={transparentOption} positions={area} />
    </>)
}
const Map=()=>{

    /*const [dimensions,setDimensions]=useState({width:"1833px",height:"700px"});
    /const updateDimensions =()=>{
        const width = window.innerWidth ;
        setDimensions({...dimensions,width:width})
    }
    useEffect(()=>{
        const width = window.innerWidth ;
        setDimensions({...dimensions,width:width});
    },[mapRef]);
    */
    return(
        <MapContainer 
        center={[24.790813855392256, 46.741996280426456 ]}
         zoom={window.innerWidth<600?18:20 } 
         scrollWheelZoom={false} 
         style={{height:900}}
        > 
            <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
            />
        <Content/>

        </MapContainer>

    );
}
export default Map;