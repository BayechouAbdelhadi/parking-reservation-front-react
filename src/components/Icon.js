import {Icon} from 'leaflet';

export const parkingIcon = new Icon({
    iconUrl:'/parking.png',
    iconSize:     [38, 50], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);

export const seatIcon = new Icon({
    iconUrl:'/nonFreeSeat.png',
    iconSize:     [40, 60], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);

export const freSeatIcon = new Icon({
    iconUrl:'/freeSeat.png',
    iconSize:     [20, 40], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);
 

