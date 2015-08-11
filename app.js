var map = L.map('map').setView([37.76094, -122.41538], 14);

L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18
}).addTo(map)
/*L.tileLayer('https://api.tiles.mapbox.com/v4/marcusbusby.52574bfb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyY3VzYnVzYnkiLCJhIjoiY2EwMzBhNzRlMWUwMTU3MDBlYTVmMmRmYjlhNjUxYWEifQ._p23kyEGPcsZBSksKHPsEg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'marcusbusby.52574bfb',
    accessToken: 'pk.eyJ1IjoibWFyY3VzYnVzYnkiLCJhIjoiY2EwMzBhNzRlMWUwMTU3MDBlYTVmMmRmYjlhNjUxYWEifQ._p23kyEGPcsZBSksKHPsEg'
}).addTo(map);*/

var marker = L.marker([51.5, -0.09]).addTo(map);
var marker2 = L.marker([50, -0.09]).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

polygon.bindPopup("I am a polygon.");

var markers = new L.FeatureGroup();

$("button").click(function() {
	var btnval = $(this).val();
	console.log($(this).val());
	$.ajax({
	  url: 'https://data.sfgov.org/resource/px6q-wjh5.json?facilitytype=' + btnval,
	  dataType: 'json',
	  success: addPoints
	})
	.fail(function() {
	  alert("Ajax failed to fetch data")
	})
});

function addPoints(data) {
	markers.clearLayers();
	console.log(data);
	for (var i= 0; i< data.length; i++) {
		if (typeof data[i].location != 'undefined') {
			var marker = L.marker([data[i].location.latitude, data[i].location.longitude]);
			marker.bindPopup(data[i].applicant)
	  		markers.addLayer(marker);
	  		console.log(data[i].location.latitude, data[i].location.longitude);
  		}	
	}
}

map.addLayer(markers)
/*function onMapClick(e) {
	instantiate a polygon with no coordinates and initial point
	after each subsequential click, add coordinates to polygon
	when initial point is clicked again, exit loop 
}*/
