<?php
function checkLogin() {
  $db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');

  if (!isset($_COOKIE['username']) || !isset($_COOKIE['password'])) {
    return false;
  }
  
  $username = $_COOKIE['username'];
  $password = $_COOKIE['password'];

  if ($username == "" || $password == "") {
    return false;
  }

  $stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();

  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user && $password === $user['password']) {
    return true;
  } else {
    return false;
  }
}

function checkPrivileges() {
  if (!isset($_COOKIE['username']) || !isset($_COOKIE['password'])) {
    return false;
  }

  $username = $_COOKIE['username'];
  $password = $_COOKIE['password'];

  return $username === 'devio10' && checkLogin();
}
?>