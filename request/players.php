<?php
$dbFile = '/var/demovio-minecraft-server/server/demovio.db';

try {
    session_start();
    $pdo = new PDO("sqlite:" . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT name, skin, pronouns FROM players WHERE isActivated = 1 AND isBanned != 1");
    if (isset($_COOKIE['is_authorised']) && $_COOKIE['is_authorised'] == 'true') {
        $stmt = $pdo->query("SELECT name, skin, pronouns, contact FROM players WHERE isActivated = 1 AND isBanned != 1");
    }
    if ($_COOKIE['username'] == 'devio10') {
        $stmt = $pdo->query("SELECT name, skin, pronouns, contact, isActivated, isBanned, citizenship, issueDate FROM players");
    }
    $players = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($players);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error connecting to Database: ' . $e->getMessage()]);
}
?>
