var p = {};
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );

function successCallback(p) {

	var d = Date.now();
//	localStorage.setItem(p.timestamp, [ p.coords.latitude, p.coords.longitude ]);
	localStorage.setItem(d, [ p.coords.latitude, p.coords.longitude ]);

	s = document.getElementById("status");
	s.innerHTML = '<dt>timestamp</dt><dd>' + new Date(p.timestamp) + '</dd>';
	s.innerHTML += '<dt>latitude</dt><dd>' + p.coords.latitude + ',' + p.coords.longitude + '</dd>';
	s.innerHTML += '<dt>accuracy</dt><dd>' + p.coords.accuracy + '</dd>';
	if(p.coords.altitude) { s.innerHTML += '<dt>altitude</dt><dd>' + p.coords.altitude + '</dd>'; }
	if(p.coords.altitudeAccuracy) { s.innerHTML += '<dt>altitude Accuracy</dt><dd>' + p.coords.altitudeAccuracy + '</dd>'; }
	if(p.coords.heading) { s.innerHTML += '<dt>heading</dt><dd>' + p.coords.heading + '</dd>'; }
	if(p.coords.speed) { s.innerHTML += '<dt>speed</dt><dd>' + p.coords.speed + '</dd>'; }

	c = document.getElementById("crumbs");

	var localStorageKeys = Object.keys(localStorage);
	localStorageKeys.sort();
	localStorageKeys.reverse();

	for (var k in localStorageKeys){
		var t = new Date(parseInt(localStorageKeys[k],10)).toRelativeTime();
		console.log(t);
		var v = localStorage.getItem(localStorageKeys[k]);
		var s = '<li>' + t + ': ' + v + '&mdash;<a href="';
		if (iOS) {
		s += 'maps:?q=' + v + '">on a map</a></li>';
		} else {
		s += 'https://maps.google.com/maps?ll=' + v + '">on a map</a></li>';
		}
		c.innerHTML += s;
	}
}

function eat() {
	c = document.getElementById("crumbs");
	c.innerHTML = "";
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
