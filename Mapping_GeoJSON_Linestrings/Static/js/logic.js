let API_KEY= config;

//Add console.log to check if code is working;
console.log('working');

//Creating Layers:

// 1. We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
let baseMaps = { Light: light, Dark: dark};

//create map object with center and zoom level
let map = L.map('mapid',{
    center: [44.0,-80.0],
    zoom: 2,
    layers: [dark]
});

// add control layer
L.control.layers(baseMaps).addTo(map)

//Accessing the airports GeoJson URl

let airportData = 'https://raw.githubusercontent.com/samiulsaqi/Mapping_Earthquakes/main/torontoRoutes.json'

//Create Style

let myStyle = {
    color: "#ffffa1",
    weight: 2
}

//Grabbing our GeoJSON data

d3.json(airportData).then(function(data){
    console.log(data);
    style: myStyle,
    L.geoJson(data,{
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Airline:"+ feature.properties.airline +"</h3> <hr> <h3> Destination: "+ feature.properties.dst + "</h3>");
        }
    }).addTo(map);

});