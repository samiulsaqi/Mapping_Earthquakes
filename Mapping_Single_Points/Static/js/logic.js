// import * as API_KEY from './static/js/config.js';

let API_KEY = 'pk.eyJ1Ijoic2FtaXVsc2FxaSIsImEiOiJja2s5NGc4aDcwdHVmMm9uem9yczJlZWV1In0.drSKTr1xuI7TgSL5r-W36g';

//Add console.log to check if code is working;
console.log('working');

//create map object with center and zoom level
let map = L.map('mapid').setView([34.0522,-118.2437],14);

// let marker = L.marker([34.0522, -118.2437]).addTo(map);

L.circleMarker([34.0522, -118.2437], {
    radius: 100,
    color: 'yellow',
    fillcolor: '#ffffa1'
 }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


