<?php
session_start();

if (!isset($_COOKIE['is_authorised'])) {
  echo 'not_logged_in';
  exit;
}

$db = new PDO('sqlite:demovio.db');

$stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
$stmt->bindParam(':username', $_SESSION['name'], PDO::PARAM_STR);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_SESSION['password'], $user['password'])) {
  echo json_encode([$user['id'],$user['name'],$user['skin'],$user['citizenship'],$user['pronouns'],$user['contact'],$user['issueDate'],$user['isActivated']]);
} else {
  echo 'wrong_credentials';
}