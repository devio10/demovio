<?php
include "checkLogin.php";
require_once('Rcon.php');
use Thedudeguy\Rcon;
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

$host = 'localhost';
$port = 10511;
$password = 'jadoiq20LAfkoaASg21';
$timeout = 3;

$rcon = new Rcon($host, $port, $password, $timeout);

if (!$rcon->connect()) {
  echo json_encode(['error' => 'Server RCON is not responding']);
  exit;
}

$db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');

$stmt = $db->prepare('SELECT name FROM players WHERE name = :username AND isBanned = 0');
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
  $rcon->sendCommand("easyban $username");

  $stmt = $db->prepare('UPDATE players SET isBanned = 1 WHERE name = :username');
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();

  echo json_encode(['success' => 'Player has been banned']);
} else {
  $rcon->sendCommand("easypardon $username");

  $stmt = $db->prepare('UPDATE players SET isBanned = 0 WHERE name = :username');
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();

  echo json_encode(['success' => 'Player has been forgiven']);
}

?>