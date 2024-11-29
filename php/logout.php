<?php
session_start();
$_SESSION = array();
setcookie('is_authorised', 'false', time() + (86400 * 180), '/');
?>
