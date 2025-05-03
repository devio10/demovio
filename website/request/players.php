<?php
$dbFile = '/var/demovio-minecraft-server/server/demovio.db';
include "checkLogin.php";
session_start();

try {
    $pdo = new PDO("sqlite:" . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (checkLogin()) {
        $stmt = $pdo->query("SELECT name, skin, pronouns, contact FROM players WHERE isActivated = 1 AND isBanned != 1");
    } else {
        echo json_encode(['error' => 'Not Authorised']);
        exit;
    }
    if ($_COOKIE['username'] == 'devio10') {
        $stmt = $pdo->query("SELECT name, skin, skinModel, pronouns, contact, isActivated, isBanned, citizenship, issueDate FROM players");
    }
    $players = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($players);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error connecting to Database: ' . $e->getMessage()]);
}
?>
