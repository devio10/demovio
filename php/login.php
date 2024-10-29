<?php
session_start();

$db = new PDO('sqlite:demovio.db');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['name'];
  $password = $_POST['password'];

  $stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();

  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  

  if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    setcookie('is_authorised', 'true', time() + (86400 * 180), '/');

    echo 'logged_in';
  } else {
    echo 'wrong_credentials';
  }
}
?>
