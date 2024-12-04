<?php
function checkForWhitelist($checkName) {
    $jsonFilePath = '/var/demovio-minecraft-server/server/whitelist.json';

    if (file_exists($jsonFilePath)) {
    $jsonContent = file_get_contents($jsonFilePath);
    $whitelist = json_decode($jsonContent, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        $playerName = $checkName;
        $playerFound = false;

        foreach ($whitelist as $entry) {
        if (isset($entry['name']) && $entry['name'] === $playerName) {
            $playerFound = true;
            return true;
            break;
        }
        }
        if (!$playerFound) {
            return false;
        }
    } else {
        return 'Error while decoding JSON: ' . json_last_error_msg();
    }
    } else {
        return "Can't access the file: " . $jsonFilePath;
    }
    }
?>