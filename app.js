var map;
function loadMap() {
    map = L.map('map').setView([10.8405515, 48.2633321], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'debakel.in6i4ino',
        accessToken: 'pk.eyJ1IjoiZGViYWtlbCIsImEiOiJjMWVJWEdFIn0.WtaUd8Rh0rgHRiyEZNzSjQ'
    }).addTo(map);

    L.control.locate().addTo(map);
    var sidebar = L.control.sidebar('sidebar').addTo(map);
}
window.onload = loadMap();

L.mapbox.accessToken = 'pk.eyJ1IjoiZGViYWtlbCIsImEiOiJjMWVJWEdFIn0.WtaUd8Rh0rgHRiyEZNzSjQ';
var featureLayer = L.mapbox.featureLayer()
featureLayer.loadURL("data/features.geojson").addTo(map);

var geojson = featureLayer.getGeoJSON();

var template_source = $("#market-template").html();
var template = Handlebars.compile(template_source);

function onEachFeature(feature, layer) {
    var context = feature.properties;
    var html = template(context);
    layer.bindPopup(html);
}
L.geoJson(geojson, {onEachFeature: onEachFeature}).addTo(map);
