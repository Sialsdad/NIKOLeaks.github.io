<?php
if (isset($_GET['count'])) {
  $count = $_GET['count'];

  // Replace the webhook URL with your own Discord webhook URL
  $webhook_url = "https://discord.com/api/webhooks/your-webhook-url";

  $data = array(
    "content" => "Visitor count: " . $count
  );

  $options = array(
    "http" => array(
      "header"  => "Content-Type: application/json",
      "method"  => "POST",
      "content" => json_encode($data)
    )
  );

  $context = stream_context_create($options);
  $result = file_get_contents($webhook_url, false, $context);
}
?>
