﻿/// <reference path="esri-leaflet.min.js" />
/// <reference path="leaflet.js" />

var map = L.map('mapSection').setView([39.861, -88.951], 13);

//ADD LEAFLET.USERMARKER PLUGIN
var marker = null;

map.on("locationfound", function (location) {
    if (!marker)
        marker = L.userMarker(location.latlng, { pulsing: true }).addTo(map);


    marker.setLatLng(location.latlng);
    marker.setAccuracy(location.accuracy);
});

map.locate({
    watch: true, //This makes the locator move as the user changes location. Set to false to disable.
    locate: false,
    setView: true,
    maxZoom: 20,
    minZoom: 18,
    enableHighAccuracy: true
});
//END LEAFLET.USERMAKER PLUGIN


var layer = L.esri.dynamicMapLayer("http://maps.decaturil.gov/ArcGIS/rest/services/leaflet/MapServer");

map.addLayer(layer);

// Identify Dynamic Map Features
map.on("click", function (e) {
    layer.identify(e.latlng, function (data) {
        document.forms["frmMap"].elements["txtPin"].value = data.results[0].attributes.PIN;
        document.forms["frmMap"].elements["txtAddress"].value = data.results[0].attributes.SITEADDRESS;
        document.forms["frmMap"].elements["txtPrimaryName"].value = data.results[0].attributes.PRIMARYNAME;
        document.forms["frmMap"].elements["txtPrimaryAddress"].value = data.results[0].attributes.PRIMARYADDRESS;
        document.forms["frmMap"].elements["txtLegalDescription"].value = data.results[0].attributes.LEGALDESCRIPTION;

    });
});