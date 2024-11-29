<?php
function checkLogin() {
  session_start();
  $db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');

  if (!isset($_SESSION['name']) || !isset($_SESSION['name'])) {
    return false;
  }
  $username = $_SESSION['name'];
  $password = $_SESSION['password'];

  $stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();

  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user && password_verify($password, $user['password'])) {
    return true;
  } else {
    return false;
  }
}
?>