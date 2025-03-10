<?php
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo "Error: use POST request";
  exit;
}
if (!isset($data['key'])) {
  echo "Error: argument key is missing";
  exit;
}

$key = $data['key'];

$validKey = 'dimaIsTheBestFriendIHaveEverKnown';

if ($key === $validKey) {
  http_response_code(200);
  echo "Success";
} else {
  echo "Error: wrong key";
}
?>