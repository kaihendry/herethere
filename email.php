<?php

if(empty($_POST["data"])) {
	die("No JSON");
	}

if(empty($_POST["email"])) {
	die("No email");
	}

$to = $_POST["email"];

$points = json_decode($_POST["data"]);

//die("here");
//echo "<!--\n\n";
//print_r($points);
//echo "-->\n\n";

$count = 0;

foreach ($points as $key => $value){
	$message .= "<h3>" . date("c", $key / 1000) . "</h3>\n<dl>\n";
	$j = json_decode($value);
//	print_r($j);
	if ($j->desc) { $message .= "<dt>description</dt><dd>" . $j->desc . "</dd>\n"; }
	if ($j->latitude) { $p = $j->latitude . "," . $j->longitude; $message .= "<dt>latitude, longitude</dt><dd>" . $p . "</dd>\n"; }
	if ($j->accuracy) { $message .= "<dt>accuracy</dt><dd>" . $j->accuracy . "</dd>\n"; }
	if ($j->altitude) { $message .= "<dt>altitude</dt><dd>" . $j->altitude . "</dd>\n"; }
	if ($j->speed) { $message .= "<dt>speed</dt><dd>" . $j->speed . "</dd>\n"; }
	if ($j->heading) { $message .= "<dt>heading</dt><dd>" . $j->heading . "</dd>\n"; }
//	echo $j["altitudeAccuracy"];
	$message .= "</dl>\n";
	$count++;
	$mp .= '%7C' . $p;
}

$message = "<img src=http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x300&maptype=roadmap&markers=$mp&sensor=true>\n" . $message;

echo $message;

$subject = "$count places visited here & there - http://ht.dabase.com";

$headers  = 'MIME-Version: 1.0' . "\r\n" .
'Content-type: text/html; charset=utf-8' . "\r\n" .
'From: kai.hendry+herethere@gmail.com';

if (mail($to, $subject, $message, $headers)) {
	echo "Mail sent to " . $to;
}

?>
