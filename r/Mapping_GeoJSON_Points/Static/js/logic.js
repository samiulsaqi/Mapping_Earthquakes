let API_KEY= config;

//Add console.log to check if code is working;
console.log('working');

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data.

//Method 1: using pointToLayer

// L.geoJSON(sanFranAirport,{
//     //Turn each feature as a marker
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>"+ feature.properties.city + "</h2> <hr> <h2>" + feature.properties.country + "</h2> <hr> <h2>" +feature.properties.name);
//     }
// }).addTo(map);

//Method 1: using onEachFeature

// L.geoJSON(sanFranAirport,{
//     onEachFeature: function(feature, layer){
//         console.log(layer);
//         layer.bindPopup("<h2> Airport Code:"+ feature.properties.faa +"</h2> <hr> <h3> Airport Name: "+ feature.properties.name + "</h3>");
//     }
// }).addTo(map);


//Creating Layers:

// 1. We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

//2. Creating the dark layer

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create base layer with both layers
let baseMaps = { Street: streets, Dark: dark};

//create map object with center and zoom level
let map = L.map('mapid',{
    center: [30,30],
    zoom: 2,
    layers: [streets]
});

// add control layer
L.control.layers(baseMaps).addTo(map)

//Accessing the airports GeoJson URl

let airportData = 'https://raw.githubusercontent.com/samiulsaqi/Mapping_Earthquakes/main/majorAirports.json'

//Grabbing our GeoJSON data

d3.json(airportData).then(function(data){
    console.log(data);
    L.geoJson(data,{
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h2> Airport Code:"+ feature.properties.faa +"</h2> <hr> <h3> Airport Name: "+ feature.properties.name + "</h3>");
        }
    }).addTo(map);

});