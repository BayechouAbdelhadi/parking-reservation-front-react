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
    iconUrl:'/setGreen.png',
    iconSize:     [35, 30],     // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);

export const freeSeatIcon = new Icon({
    iconUrl:'/setGreen.png',
    iconSize:     [25, 30], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);
export const nonFreeSeatIcon = new Icon({
    iconUrl:'/setRed.png',
    iconSize:     [25, 30], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);

export const freeParkingIcon = new Icon({
    iconUrl:'/parckGreen.png',
    iconSize:     [80, 60], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);
export const nonFreeParkingIcon = new Icon({
    iconUrl:'/parckRed.png',
    iconSize:     [80, 60], // size of the icon
   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] ,
}
);