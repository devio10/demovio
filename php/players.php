<?php
$dbFile = 'demovio.db';

try {
    $pdo = new PDO("sqlite:" . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT name, skin, pronouns FROM players");
    if ($_COOKIE['is_authorised'] == 'true') {
        $stmt = $pdo->query("SELECT name, skin, pronouns, contact FROM players");
    }
    $players = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($players);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error connecting to Database: ' . $e->getMessage()]);
}
?>
