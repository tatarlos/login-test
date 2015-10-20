<?php
//include __DIR__ . '/../src/functions.php';
include 'functions.php';

if (isset($_POST["action"]) && !empty($_POST["action"])) {
 //Checks if action value exists
	$action = $_POST["action"];
	$action();
}

if (isset($_GET["action"]) && !empty($_GET["action"])) {
 //Checks if action value exists
	$action = $_GET["action"];
	$action();
}

?>