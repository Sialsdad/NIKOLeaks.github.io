<?php
$webhookId = "1104982932587810876";
$webhookToken = "VB_Nm7bALNRtw3MCw6yYOg0a6-WOfS1wTNXTt3EsN7-xX-uf9SG8DhckB2hWqw8nukVK";
$webhookUrl = "https://discord.com/api/webhooks/{$webhookId}/{$webhookToken}";

$visitorId = $_POST['visitorId'];
$visitorCount = $_POST['visitorCount'];

$message = "New visitor with ID {$visitorId}. Total visitors: {$visitorCount}";

$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-type: application/json']);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['content' => $message]));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_exec($ch);
curl_close($ch);
