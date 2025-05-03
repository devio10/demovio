<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (file_exists(__DIR__ . "/website" . $path)) {
    return false;
}

if (file_exists(__DIR__ . "/website" . $path . '.html')) {
    include __DIR__ . "/website" . $path . '.html';
    exit;
}

http_response_code(404);
echo '404 Not Found';
