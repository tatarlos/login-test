<?php 
date_default_timezone_set('NZ');
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'dinermate_app');

$connection = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);  //remember the 'i' in mysql




