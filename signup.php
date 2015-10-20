<?php include 'header.php'; ?>

  <h3>Signup Form</h3>
  <p>Please enter your name and email addres to create your account</p>
    
  <?php  
  ?>
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
  <?php include 'footer.php'; ?>
