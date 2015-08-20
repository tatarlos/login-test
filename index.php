<?php
date_default_timezone_set('NZ');
session_start();
if(isset($_SESSION['user'])):
	$user = $_SESSION['user'];
	$username = $user['name'];
	$priv = $user['priv'];
?>
<div>welcome <?php echo $username ?></div>
<button id='logout'>logout</button>
<?php else: ?>
<!DOCTYPE html>
<style>
	

</style>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<form action="">
		<label for="name">Name</label>
		<input id="name" name="name" type="text">
		<label for="password">Password</label>
		<input  id="password" name="password" type="text">
		<input class ="login-btn" type="submit" value="Login">	
	</form>
</body>
<?php endif; ?>
 <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
<script src="js/main.js"></script>
</html>