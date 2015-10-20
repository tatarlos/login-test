<?php 
		include 'connection.php';
		
		session_start();

		if(isset($_SESSION['user'])):
			$user = $_SESSION['user'];
		?>

		<div class="user-container">
	  	<div class="login" style="display:none">
				<div>welcome <?php echo $user['username'] ?></div>
				<button id='logout'>logout</button>

				<?php else: ?>
					
				<form action="">
					<label for="name">Name</label>
					<input id="name" name="name" type="text">
					<label for="password">Password</label>
					<input  id="password" name="password" type="password">
					<input class ="login-btn" type="submit" value="Login">	
				</form>

				
			</div><!-- end of login -->
			<div class="register">
				<h3>Signup</h3>
			  <p>Please enter your name and email address to create your account</p>
			  <!-- start sign up form -->  
			  <form class="registration" action="" method="post">
			    
			    <p class="status">Today I ate some cake</p>
			    <label for="name">Name:</label>
			    <input id ="name" type="text" name="name" value="" />
			    <label for="email">Email:</label>
			    <input id ="email" type="text" name="email" value="" />
			    <input id="spam" class="hidden" name="spam" type="text" style ="display:none;">
			    <input type="submit" class="submit_button" value="Sign up" />
			  </form>

			<?php endif; ?>
			</div><!-- end of register -->
		</div><!-- end of user container -->
	  <title>components</title>