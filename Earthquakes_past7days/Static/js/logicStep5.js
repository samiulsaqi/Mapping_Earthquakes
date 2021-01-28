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
let baseMaps = { "Street": streets, "Satellite": satelliteStreets};

let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

//create map object with center and zoom level
let map = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// add control layer
L.control.layers(baseMaps, overlays).addTo(map)

//Accessing the airports GeoJson URl

let eqData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

//Grabbing our GeoJSON data

d3.json(eqData).then(function(data){
    console.log(data);
    function styleInfo(feature){
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000", //black
            radius: getRadius(feature.properties.mag),
            srtoke: true,
            weight: 0.5        
        }
    }

    function getColor(magnitude){
        if (magnitude > 5) {
            return "#ea2c2c";
          }
          if (magnitude > 4) {
            return "#ea822c";
          }
          if (magnitude > 3) {
            return "#ee9c00";
          }
          if (magnitude > 2) {
            return "#eecc00";
          }
          if (magnitude > 1) {
            return "#d4ee00";
          }
          return "#98ee00";
    }

    function getRadius(magnitude){
        if (magnitude ===0){
            return 1;
        }
        return magnitude * 4;
    }
    L.geoJson(data,{
        pointToLayer:function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,

        onEachFeature: function(feature,layer){
            layer.bindPopup("Magnitude: "+ feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    
    earthquakes.addTo(map);

    // Create a legend control object.
    let legend = L.control({
    position: "bottomright"
    });

    //Then add all details for legend
    legend.onAdd = function(){
      let div = L.DomUtil.create("div","info legend");
      const mag = [0,1,2,3,4,5];
      const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
      ]

      // Looping through our intervals to generate a label with a colored square for each interval.
      for (var i=0; i<mag.length; i++){
        console.log(colors[i]);
        div.innerHTML +=
          "<i style='background: " + colors[i] +"'></i>"+
         mag[i] + (mag[i+1] ? "&ndash;" + mag[i+1]+"<br>":"+");
      }
      return div;
    };

    legend.addTo(map);

});