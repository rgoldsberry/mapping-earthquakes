// Add console.log to chec kand see if our code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    style: "streets-v11",
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    style: "satellite-streets-v11",
    accessToken: API_KEY
});


// create a base layer to hold the maps
let baseMaps = {
    "Streets" : streets,
    "Satellite Streets" : satelliteStreets
};

// create the map object using setView
let map = L.map('mapid', {
    center : [43.7, -79.3],
    zoom : 11,
    layers : [streets] //this is the default layers shown
});

// setting up layer control
L.control.layers(baseMaps).addTo(map);

// getting neighborhood geoJSON data 
let torontoHoods = "https://raw.githubusercontent.com/rgoldsberry/mapping-earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

// setting polygon styles
let myStyle = {
    color : "blue",
    weight : 1,
    fillColor : "yellow"
};

// adding data to map
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        style : myStyle,
        onEachFeature : function(feature, layer) {
            layer.bindPopup(`<h3>Neighborhood: ${feature.properties.AREA_NAME}`)
        }
    }).addTo(map);
});