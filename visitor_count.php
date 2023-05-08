<?php
$webhookId = "1105161141765808138";
$webhookToken = "gXGG0tXtDGPTk6mUGP7yPfdXvqTvfQaYoLxWLbDcmt3Ii32Yi_bZyTh1V7ZKakk-eKI9";
$webhookUrl = "https://discord.com/api/webhooks/{$webhookId}/{$webhookToken}";

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['visitorId'])) {
  $visitorId = $data['visitorId'];
  $message = "New visitor with ID {$visitorId}";
  $payload = json_encode(array('content' => $message));
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $webhookUrl);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($ch);
  curl_close($ch);
}
?>