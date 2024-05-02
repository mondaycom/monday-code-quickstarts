<?php

// $env = getenv();


// error_log(print_r($env, TRUE));

// $name = getenv('NAME', true) ?: 'World';
// echo sprintf('Hello from PHP %s!', $name);

// Autoload files using the Composer autoloader.
require_once __DIR__ . '/vendor/autoload.php';

use Mondaycom\Code\Utils;
use Mondaycom\Code\Quickstart;


$utils = new Utils();
$qs = new Quickstart();

// Secure storage
$utils->log($qs->demoSecureStorage());

// Environment variables - this will throw an error since we don't have the 'myKey' env variable
$utils->log($qs->demoEnvVariablesGet('myKey'));

// queue
$qs->demoPublishMessage(array(
    "foo" => "bar",
    "bar" => "foo",
));

// finish
$utils->log('Demo ran successfully');
