<?php
function doesPlayerExists($name) {
  try {
    $db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
      $stmt = $db->prepare('SELECT * FROM players WHERE name = :username LIMIT 1');
      $stmt->bindParam(':username', $name, PDO::PARAM_STR);
      $stmt->execute();
  
      $user = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($user) {
        return true;
      } else {
        return false;
      }
    }
  } catch (PDOException $e) {
    return 'Error: ' . $e->getMessage();
  }
}


?>
