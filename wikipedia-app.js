function successCallback(p) {

$('#status').text('Your location is: ' + p.coords.latitude + ', ' + p.coords.longitude).css({ color:"green" });

// see wikinear.com :-)
$.getJSON("http://web.archive.org/web/20110724130718/http://ws.geonames.org/findNearbyWikipediaJSON?lat=" + p.coords.latitude + "&lng=" + p.coords.longitude + "&callback=?",
function(data){
$.each(data.geonames, function(i,item){
$("#status").append($("<br/>"));
$("#status").append(item.distance);
$("<a>" + item.title + "</a>").attr("href", "http://" +item.wikipediaUrl).appendTo("#status");
});
});

}
