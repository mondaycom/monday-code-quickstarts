<?php
namespace Mondaycom\Code;

class Utils
{
    public function printEnv() {
        $env = getenv();
        $this->log($env);
    }

    public function log($message) {

        $stringified = is_array($message) ? $this->arrayToString($message) : $message;
        $log = date('H:i:s') . " - $stringified".PHP_EOL;
        print(nl2br($log));
        flush();
        ob_flush();
    }

    private function arrayToString($arr) {
        $stringified = '';
        foreach ($arr as $key => $value) {
            $stringified .= "$key:$value";
        }

        return $stringified;
    }
}
