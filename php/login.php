<?php
session_start();
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $data['name'];
  $password = $data['password'];

  $stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();

  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  

  if ($user && password_verify($password, $user['password'])) {
    $_SESSION['password'] = $password;
    $_SESSION['name'] = $user['name'];
    setcookie('is_authorised', 'true', time() + (86400 * 180), '/');

    echo 'logged_in';
  } else {
    echo 'wrong_credentials';
  }
}
?>
