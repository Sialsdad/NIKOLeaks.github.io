<?php

// Get the visitor ID from the request
$visitorId = $_POST['visitorId'];

// Send a request to the Discord webhook with the visitor count
$webhookId = "1105161141765808138";
$webhookToken = "gXGG0tXtDGPTk6mUGP7yPfdXvqTvfQaYoLxWLbDcmt3Ii32Yi_bZyTh1V7ZKakk-eKI9";
$webhookUrl = "https://discord.com/api/webhooks/{$webhookId}/{$webhookToken}";

$data = [
    'content' => "New visitor with ID {$visitorId}"
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($webhookUrl, false, $context);

// Set a cookie with the visitor ID
setcookie("visitorId", $visitorId, time() + 365 * 24 * 60 * 60, "/");

?>
