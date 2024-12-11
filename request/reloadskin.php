<?php
include "checkLogin.php";
include "changeskin.php";
session_start();

if (!checkPrivileges()) {
  http_response_code(403);
  echo json_encode([
    'error' => 'NO_PRIVILEGES'
  ]);
  exit;
}
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$username = $data['name'] ?? null;

if (!$username) {
  http_response_code(400);
  echo json_encode(['error' => 'Username is required']);
  exit;
}

$db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');

$stmt = $db->prepare('SELECT skin FROM players WHERE name = :username LIMIT 1');
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
  echo json_encode(['error' => 'Database error']);
  exit;
}
$skin = $user['skin'];
if (trim($user['skin']) === '') {
  $skin = $username;
}
if (changeSkin($username, $skin)) {
  echo json_encode(['success' => 'Changed the skin']);
} else {
  echo json_encode(['error' => 'Cannot change the skin']);
}
?>