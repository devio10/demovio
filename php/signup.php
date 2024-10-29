<?php
session_start();

try {
  $db = new PDO('sqlite:demovio.db');
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['name'];
    $password = $_POST['password'];

    $stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    if ($user) {
    echo 'already_exists';
    } else {
    $stmt = $db->prepare("INSERT INTO players (name, password, skin, citizenship, pronouns, contact, issueDate, isActivated) VALUES (:name, :password, :skin, :citizenship, :pronouns, :contact, :issueDate, :isActivated)");
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt->execute([
      ':name' => $username,
      ':password' => $hashedPassword,
      ':skin' => NULL,
      ':citizenship' => $_POST['citizenship'],
      ':pronouns' => $_POST['pronouns'],
      ':contact' => $_POST['contact'],
      ':issueDate' => date('d.m.Y'),
      ':isActivated' => 0,
    ]);
    }
  }
} catch (PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}

?>
