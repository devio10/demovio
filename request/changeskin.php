<?php
require_once('Rcon.php');
use Thedudeguy\Rcon;

function changeSkin($player, $skin) {

    $host = 'localhost';
    $port = 10511;
    $password = 'jadoiq20LAfkoaASg21';
    $timeout = 3;

    $rcon = new Rcon($host, $port, $password, $timeout);

    if ($rcon->connect()) {
        $rcon->sendCommand("execute as $player run skin set player $skin");
        return true;
    } else {
        return false;
    }
}
?>