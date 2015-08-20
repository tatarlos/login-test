<?php
//include __DIR__ . '/../src/functions.php';
include 'functions.php';
$action = $_POST['action'];
date_default_timezone_set('NZ');
$action();
?>