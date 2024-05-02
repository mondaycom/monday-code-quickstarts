<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '':
        case '/':
            require __DIR__ . '/demo.php';
            break;

        case '/mndy-queue':
            require __DIR__ . '/queue.php';
            break;        

    default:
        echo '404';
        http_response_code(404);
}