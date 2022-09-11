// Add console.log to chec kand see if our code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the light view tile layer that will be an option for our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// create a base layer to hold the maps
let baseMaps = {
    Street : streets,
    Dark : dark,
    Light : light
};

// create the map object using setView
let map = L.map('mapid', {
    center : [44, -80],
    zoom : 4,
    layers : [dark] //this is the default layers shown
});

// accessing the toronto routes data
let torontoData = "https://raw.githubusercontent.com/rgoldsberry/mapping-earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json"

d3.json(torontoData).then(function(data) {
    console.log(data);

    L.geoJSON(data, {
        onEachFeature : function(feature, layer) {
            layer.bindPopup(`<h3>Airline: ${feature.properties.airline}</h3><hr><h4>Destination: ${feature.properties.dst}`)
        } ,
        style : {
            color : "lightYellow",
            weight : 2
        }
    }).addTo(map);
})

// setting up layer control
L.control.layers(baseMaps).addTo(map);