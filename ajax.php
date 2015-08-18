<?php 
$action = $_POST['action'];
$action();


function verify(){
	$name = $_POST['name'];
	$password = $_POST['password'];
	$test = "";
	$testpass = 'test';
	$testuser = 'test';


	if($testpass === $password && $testuser === $name){
		$test = ("success");	
	}else{
		$test = ("wrong info");	
	}
	echo($test);
}
?>