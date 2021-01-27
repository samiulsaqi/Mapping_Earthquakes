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