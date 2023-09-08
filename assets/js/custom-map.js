// if (document.getElementById('state1')) {
//   const countUp = new CountUp('state1', document.getElementById("state1").getAttribute("countTo"));
//   if (!countUp.error) {
//     countUp.start();
//   } else {
//     console.error(countUp.error);
//   }
// }
// if (document.getElementById('state2')) {
//   const countUp1 = new CountUp('state2', document.getElementById("state2").getAttribute("countTo"));
//   if (!countUp1.error) {
//     countUp1.start();
//   } else {
//     console.error(countUp1.error);
//   }
// }
// if (document.getElementById('state3')) {
//   const countUp2 = new CountUp('state3', document.getElementById("state3").getAttribute("countTo"));
//   if (!countUp2.error) {
//     countUp2.start();
//   } else {
//     console.error(countUp2.error);
//   };
// }

var openStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20
});

var googleStreet = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleEarth = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var map = L.map('map', {
    layers: [openStreet, googleStreet, googleHybrid, googleTerrain, googleEarth]
}).setView([-6.6061381, 106.801851], 12);

var baseMaps = {
    "Open Street": openStreet,
    "Google Street": googleStreet,
    "Google Hybrid": googleHybrid,
    "Google Terrain": googleTerrain,
    "Google Earth": googleEarth
};

var icon = L.icon({
    iconUrl: './assets/img/water-drop.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 5],
});

var marker = L.marker([-6.6061381, 106.801851], {
    icon: icon,
    draggable: true
})
marker.bindPopup("<b>Latitude: " + marker.getLatLng().lat + "</b><br><b>Longitude: " + marker.getLatLng().lng);
marker.on('dragend', function (e) {
    console.log([marker.getLatLng().lat, marker.getLatLng().lng])
    marker.bindPopup("<b>Latitude: " + marker.getLatLng().lat + "</b><br><b>Longitude: " + marker.getLatLng().lng)
        .openPopup()
});

var markers = L.layerGroup([marker]);

var bounds = [
    [-6.6802035759036364, 106.73314341332245],
    [-6.510848666779939, 106.84848930495318]
];
map.fitBounds(bounds);

var etactual = L.layerGroup([L.imageOverlay('./assets/img/et-aktual.png', bounds)]);
var temperature = L.layerGroup([L.imageOverlay('./assets/img/temperature.png', bounds)]);
var ndvi = L.layerGroup([L.imageOverlay('./assets/img/ndvi.png', bounds)]);

var overlayMaps = {
    "Markers": markers,
    "Evapotranspiration": etactual,
    "Temperature": temperature,
    "NDVI": ndvi
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("<b>Latitude: " + e.latlng.lat + "</b><br><b>Longitude: " + e.latlng.lng)
        .openOn(map);
}

map.on('click', onMapClick);

// var marker = L.marker([-6.6061381, 106.801851], {
//   icon: icon,
//   draggable: true
// }).addTo(map)
// marker.bindPopup("<b>Hello world!</b><br />I am a popup." + [marker.getLatLng().lat, marker.getLatLng().lng])

// marker.on('dragend', function (e) {
//   console.log([marker.getLatLng().lat, marker.getLatLng().lng])
//   marker.bindPopup("<b>Hello world!</b><br />I am a popup." + [marker.getLatLng().lat, marker.getLatLng().lng])
//     .openPopup()
// });

// L.circle([51.508, -0.11], 500, {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5
// }).addTo(mymap).bindPopup("I am a circle.");

// L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(mymap).bindPopup("I am a polygon.");