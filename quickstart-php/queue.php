<?php

$json = file_get_contents('php://input');
$message = json_decode($json);

var_dump($message);
