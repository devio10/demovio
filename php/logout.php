<?php
setcookie('username', '', time() - 3600, '/');
setcookie('password', '', time() - 3600, '/');

unset($_COOKIE['username']);
unset($_COOKIE['password']);
?>
