<?php

// Enable CORS to allow the JavaScript code to fetch from this server
header('Access-Control-Allow-Origin: *');

// Read the visitor count from a file or database
$count = intval(file_get_contents('visitor-count.txt'));

// Increment the visitor count and save it
$count++;
file_put_contents('visitor-count.txt', strval($count));

// Return the visitor count to the JavaScript code
echo $count;

// Set headers to disable caching
header('Expires: Thu, 19 Nov 1981 08:52:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
