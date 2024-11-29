<?php
$username = $_GET['username'] ?? null;

if (!$username) {
  http_response_code(400);
  echo json_encode(['error' => 'Username is required']);
  exit;
}
$url = "https://api.mojang.com/users/profiles/minecraft/$username";
$response = file_get_contents($url);
header('Content-Type: application/json');
echo $response;
?>