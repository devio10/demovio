<?php
include "playerexists.php";
include "whitelist.php";
sleep(3);
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

try {
  $db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $data['name'];
    $password = $data['password'];
    
    if (doesPlayerExists($username)) {
      echo 'account_already_created';
      exit;
    }

    $isActivated = checkForWhitelist($username);

    $stmt = $db->prepare("INSERT INTO players (name, password, skin, citizenship, pronouns, contact, issueDate, isActivated) VALUES (:name, :password, :skin, :citizenship, :pronouns, :contact, :issueDate, :isActivated)");
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

      $stmt->execute([
        ':name' => $username,
        ':password' => $hashedPassword,
        ':skin' => $data['skin'],
        ':citizenship' => $data['citizenship'],
        ':pronouns' => $data['pronouns'],
        ':contact' => $data['contact'],
        ':issueDate' => date('d.m.Y'),
        ':isActivated' => $isActivated,
      ]);

      echo "created";

      setcookie('username', $username, time() + (86400 * 90), '/');
      setcookie('password', $hashedPassword, time() + (86400 * 90), '/');
  }
} catch (PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}

?>
