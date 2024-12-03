<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (file_exists(__DIR__ . $path)) {
    return false;
}

if (file_exists(__DIR__ . $path . '.html')) {
    include __DIR__ . $path . '.html';
    exit;
}

http_response_code(404);
echo '404 Not Found';
