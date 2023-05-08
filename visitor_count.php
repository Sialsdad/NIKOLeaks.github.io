<?php
if (isset($_GET['count'])) {
  $count = $_GET['count'];

  // Replace the webhook URL with your own Discord webhook URL
  $webhook_url = "https://discord.com/api/webhooks/1100524825870602350/f_Dh-j7NvAGSHicdhWWFY6NUWyvEZdLynyksxuKVKIvLMHKityw1HpeUy4vSABSAKD_l";

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
