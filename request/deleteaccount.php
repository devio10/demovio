<?php
include "checkLogin.php";
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

$stmt = $db->prepare('DELETE FROM players WHERE name = :username');
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
  echo json_encode(['error' => 'Database error']);
  exit;
}
echo json_encode(['success' => 'Account has been removed']);
?>