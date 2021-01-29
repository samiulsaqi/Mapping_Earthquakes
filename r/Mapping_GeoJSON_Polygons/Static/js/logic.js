let API_KEY= config;

//Add console.log to check if code is working;
console.log('working');

//Creating Layers:

// 1. We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

//2. Creating the dark layer

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create base layer with both layers
let baseMaps = { "Street": streets, "Satellite Streets": satelliteStreets};

//create map object with center and zoom level
let map = L.map('mapid',{
    center: [43.7,-79.3],
    zoom: 11,
    layers: [streets]
});

// add control layer
L.control.layers(baseMaps).addTo(map)

//Accessing the airports GeoJson URl

let torontoHoods = 'https://raw.githubusercontent.com/samiulsaqi/Mapping_Earthquakes/main/torontoNeighborhoods.json'

//Grabbing our GeoJSON data

d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJson(data).addTo(map);
});