/*{
    " id": "FeatureCollection",
    "name": "FreeParck",
    "crs": { " id": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
    { " id": "Feature", "properties": { "car_place_": 1, "car_place1": "متوفر" }, "geometry": { " id": "Point", "coordinates": [ 46.743074586669017, 24.790685758827877 ] } },
    { " id": "Feature", "properties": { "car_place_": 2, "car_place1": "متوفر" }, "geometry": { " id": "Point", "coordinates": [ 46.742569203473295, 24.79046115469022 ] } },
    { " id": "Feature", "properties": { "car_place_": 4, "car_place1": "متوفر" }, "geometry": { " id": "Point", "coordinates": [ 46.741346627812661, 24.789937054496249 ] } },
    { " id": "Feature", "properties": { "car_place_": 5, "car_place1": "متوفر" }, "geometry": { " id": "Point", "coordinates": [ 46.740741819081322, 24.791130734104843 ] } },
    { " id": "Feature", "properties": { "car_place_": 7, "car_place1": "متوفر" }, "geometry": { " id": "Point", "coordinates": [ 46.74198403820229, 24.791658318888238 ] } },
    { " id": "Feature", "properties": { "car_place_": 8, "car_place1": "متوفر" }, "geometry": { " id": "Point", "coordinates": [ 46.742574455024467, 24.791928019313854 ] } }
    ]
    {
" id": "FeatureCollection",
"name": "NonFreeParck",
"crs": { " id": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ " id": "Feature", "properties": { "car_place_": 3, "car_place1": "محجوز" }, "geometry": { " id": "Point", "coordinates": [ 46.741953457753397, 24.790191691658233 ] } },
{ " id": "Feature", "properties": { "car_place_": 6, "car_place1": "محجوز" }, "geometry": { " id": "Point", "coordinates": [ 46.741404049922259, 24.791430421783524 ] } }
]
}
    }
/*/
const parkings =[
    { " id": "1", "coordinates": [ 46.743074586669017, 24.790685758827877 ]} ,
    { " id": "2", "coordinates": [ 46.742569203473295, 24.79046115469022 ] } ,
    { " id": "3", "coordinates": [ 46.741346627812661, 24.789937054496249 ] },
    { " id": "4", "coordinates": [ 46.740741819081322, 24.791130734104843 ] },
    { " id": "5", "coordinates": [ 46.74198403820229, 24.791658318888238 ] },
    { " id": "6", "coordinates": [ 46.741953457753397, 24.790191691658233 ] },
    { " id": "7", "coordinates": [ 46.741404049922259, 24.791430421783524 ] }
];
export default parkings;   