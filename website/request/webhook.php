<?php

// Задаем секретный токен
$secretToken = 'jorsuj-sakso7-!kefSeFG2k14AZ!';

// Получаем токен из параметра URL
$providedToken = $_GET['token'] ?? '';

// Сравниваем токены
if (hash_equals($secretToken, $providedToken)) {
    // Выполняем git pull
    $output = [];
    $resultCode = 0;
    exec('cd /var/www/demovio.lol/ && git pull 2>&1', $output, $resultCode);
    echo "ok";
} else {
    // Неверный токен
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
}
