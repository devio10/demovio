<?php
include 'whitelist.php';
include 'playerexists.php';
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
if (!isset($data['name'])) {
    echo "name_not_set";
    exit;
}

$playerExists = doesPlayerExists($data['name']);
if ($playerExists == true) {
    echo "account_already_created";
    exit;
}
if ($playerExists != false) {
    echo $playerExists;
    exit;
}

echo checkForWhitelist($data['name']);
?>