function successCallback(p) {

	var d = Date.now();
//	localStorage.setItem(p.timestamp, [ p.coords.latitude, p.coords.longitude ]);
	localStorage.setItem(d, [ p.coords.latitude, p.coords.longitude ]);

	s = document.getElementById("status");
	s.innerHTML = '<dt>timestamp</dt><dd>' + new Date(p.timestamp) + '</dd>';
	s.innerHTML += '<dt>latitude</dt><dd>' + p.coords.latitude + '</dd>';
	s.innerHTML += '<dt>longitude</dt><dd>' + p.coords.longitude + '</dd>';
	s.innerHTML += '<dt>accuracy</dt><dd>' + p.coords.accuracy + '</dd>';
	if(p.coords.altitude) { s.innerHTML += '<dt>altitude</dt><dd>' + p.coords.altitude + '</dd>'; }
	if(p.coords.altitudeAccuracy) { s.innerHTML += '<dt>altitude Accuracy</dt><dd>' + p.coords.altitudeAccuracy + '</dd>'; }
	if(p.coords.heading) { s.innerHTML += '<dt>heading</dt><dd>' + p.coords.heading + '</dd>'; }
	if(p.coords.speed) { s.innerHTML += '<dt>speed</dt><dd>' + p.coords.speed + '</dd>'; }

	c = document.getElementById("crumbs");
	for (var i=0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		console.log("key" + k);
		var t = new Date(parseInt(k)).toRelativeTime();
		console.log(t);
		var v = localStorage.getItem(k);
		console.log("foo" + v);
		c.innerHTML += '<li>' + t + ': ' + v + '&mdash;<a href="maps:?q=' + v + '">on a map</a></li>';
	}

}

var p = {};

function errorCallback(e) {
	s = document.getElementById("status");
	s.innerHTML = e.message;
	s.style.color = "red";
}

function geohello() {
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
		maximumAge: 600000
	});
}
