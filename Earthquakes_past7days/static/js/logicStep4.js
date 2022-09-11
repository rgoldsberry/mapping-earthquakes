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
    "Satellite" : satelliteStreets
};

// create overlay layers
let earthquakes = new L.layerGroup();

// populate the overlays with above layers
let overlays = {
    Earthquakes : earthquakes
}

// create the map object using setView
let map = L.map('mapid', {
    center : [39.5, -98.5],
    zoom : 3,
    layers : [streets] //this is the default layers shown
});

// setting up layer control
L.control.layers(baseMaps, overlays).addTo(map);

// setting up marker style
function styleInfo(feature) {
    return {
        opacity : 1,
        fillOpacity : 1,
        fillColor : getColor(feature.properties.mag),
        color : "#000000",
        radius : getRadius(feature.properties.mag),
        stroke : true,
        weight : 0.5
    };
};

function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }

    return magnitude * 4;
}

function getColor(magnitude) {
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
  };

// accessing the USGS earthquake geoJSON
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data);
    // build the layer
    L.geoJSON(data, {
        // make a circleMarker from each feature
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // set the style
        style : styleInfo ,
        // create the popup for each feature
        onEachFeature : function(feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`)
        }
    }).addTo(earthquakes);

    // now add earthquake layer to map
    earthquakes.addTo(map);
})