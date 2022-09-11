// Add console.log to chec kand see if our code is working
console.log("working");

// create the map object using setView
let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data.
let airportData = "https://raw.githubusercontent.com/rgoldsberry/mapping-earthquakes/main/majorAirports.json"

d3.json(airportData).then(function(data) {
    // putting the data on a map
    L.geoJSON(data, {
        onEachFeature : function(feature, layer) {
            // console.log(feature.properties);
            // console.log(layer);
            layer.bindPopup("<h3> Airport Code: " + feature.properties.faa + "</h3><hr><h4>Airport Name: " + feature.properties.name + "</h4>");
        }
    }).addTo(map);
});



// Older Syntax Notes below

// Put the GeoJSON data on the map using the pointToLayer function
// L.geoJSON(sanFranAirport, {
//     pointToLayer : function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//             .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
// }).addTo(map);

// Put the GeoJSON data on the map using the onEachFeature function
// L.geoJSON(sanFranAirport, {
//     onEachFeature : function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup(feature.properties.name);
//     }
// }).addTo(map);