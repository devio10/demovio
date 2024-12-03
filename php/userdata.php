<?php
include "checkLogin.php";
session_start();

if (!checkLogin()) {
  echo json_encode([
    'error' => 'NOT_AUTHORISED'
  ]);
  setcookie("username", "", time()-3600);
  setcookie("password", "", time()-3600);
  exit;
}

$db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');

$stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
$stmt->bindParam(':username', $_COOKIE['username'], PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && $_COOKIE['password'] === $user['password']) {
  echo json_encode([$user['id'],$user['name'],$user['skin'],$user['citizenship'],$user['pronouns'],$user['contact'],$user['issueDate'],$user['isActivated']]);
} else {
  echo 'wrong_credentials';
}