var p = {};
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );

// From http://www.movable-type.co.uk/scripts/latlon.js
/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad == 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

function save(){
	var inputs = document.getElementsByTagName("input");
	for (x=0;x<=inputs.length;x++){
		try {
			var k = inputs[x].getAttribute("name");
			if (inputs[x].value) {
			var desc = inputs[x].value;
			var v = JSON.parse(localStorage.getItem(k));
			v.desc = desc;
			//console.log("k: " + k);
			//console.log(v);
			localStorage.setItem(k, JSON.stringify(v));
			}
		} catch(e) {}
	}
}

function distance(lat1,lon1,lat2,lon2) {
var R = 6371; // km
var dLat = (lat2-lat1).toRad();
var dLon = (lon2-lon1).toRad();
var lat1 = lat1.toRad();
var lat2 = lat2.toRad();

var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
return R * c;
}

function successCallback(p) {

	var d = Date.now();
	var coords = p.coords; // http://stackoverflow.com/questions/11042212
	var coords = JSON.stringify(coords); // BUG: not working in FF [xpconnect wrapped nsIDOMGeoPositionCoords]
	localStorage.setItem(d, coords);
	//console.log("Set: " + d);
	//console.log(coords);

	s = document.getElementById("status");
	s.innerHTML = '<dt>timestamp</dt><dd>' + new Date(p.timestamp) + '</dd>';
	s.innerHTML += '<dt>latitude</dt><dd>' + p.coords.latitude + ',' + p.coords.longitude + '</dd>';
	s.innerHTML += '<dt>accuracy</dt><dd>' + p.coords.accuracy + '</dd>';
	if(p.coords.altitude) { s.innerHTML += '<dt>altitude</dt><dd>' + p.coords.altitude + '</dd>'; }
	if(p.coords.altitudeAccuracy) { s.innerHTML += '<dt>altitude Accuracy</dt><dd>' + p.coords.altitudeAccuracy + '</dd>'; }
	if(p.coords.heading) { s.innerHTML += '<dt>heading</dt><dd>' + p.coords.heading + '</dd>'; }
	if(p.coords.speed) { s.innerHTML += '<dt>speed</dt><dd>' + p.coords.speed + '</dd>'; }

	cul = document.getElementById("crumbs");

	var localStorageKeys = Object.keys(localStorage);
	localStorageKeys.sort();
	localStorageKeys.reverse();

	for (var k in localStorageKeys){
		var t = new Date(parseInt(localStorageKeys[k],10)).toRelativeTime();
		var v = JSON.parse(localStorage.getItem(localStorageKeys[k]));
		//console.log("Got: " + parseInt(localStorageKeys[k],10));
		var c = v.latitude + ',' + v.longitude;
		var desc=""
		if (v.desc) { desc = v.desc; }
		var s = '<li><input value="' + desc + '" name=' + parseInt(localStorageKeys[k],10) + ' type=text>' + 
		t + ' d: ' + distance(v.latitude, v.longitude, p.coords.latitude, p.coords.longitude).toFixed(2) +'km &mdash; <a href="';
		if (iOS) {
		s += 'maps://?q=' + c + '">on a map</a></li>';
		} else {
		s += 'https://maps.google.com/maps?q=' + c + '">on a map</a></li>';
		}
		cul.innerHTML += s;
	}
}

function clearup() {
	crumbs = document.getElementById("crumbs");
	crumbs.innerHTML = "";
	localStorage.clear();
}

function errorCallback(e) {
	s = document.getElementById("status");
	s.innerHTML = e.message;
	s.style.color = "red";
}

function geohello() {
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function m() { 
e = document.getElementById("e");
console.log("Emailing: " + e.value);
postAjax(e.value, JSON.stringify(localStorage));
}

postAjax = function(email, data) {
	var url = "http://custom.webconverger.com/test-html.php";
	var ajaxRequest = getAjaxRequest();
	ajaxRequest.open("POST", url, true);
	ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxRequest.send("email=" + encodeURIComponent(email) + "&data=" + encodeURIComponent(data));
};

// Returns an AJAX request obj
getAjaxRequest = function() {

	var ajaxRequest;
	ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		if (ajaxRequest.readyState == 4) {
			console.log(ajaxRequest.responseText);
		}
	};

	return ajaxRequest;

};

setInterval('save()', 15 * 1000);
