<?php 
include 'header.php';

if(isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash'])){
    // Verify data
    $email = mysqli_real_escape_string($connection,$_GET['email']); // Set email variable
    $hash = mysqli_real_escape_string($connection,$_GET['hash']); // Set hash variable

    $sql = "SELECT email, hash, active FROM users WHERE email='$email' AND hash='$hash' AND active='0'";
    $result = mysqli_query($connection, $sql);
    $match =  mysqli_num_rows($result);

    if($match > 0){
        // We have a match, activate the account
        mysqli_query($connection , "UPDATE users SET active='1' WHERE email='$email' AND hash='$hash' AND active='0'");
        echo '<div class="statusmsg">Your account has been activated, you can now login</div>';
    }else{
        // No match -> invalid url or account has already been activated.
        echo '<div class="statusmsg">The url is either invalid or you already have activated your account.</div>';
    }
}else{
    // Invalid approach
   echo "something went wrong, please try refreshing the page or reclicking the link";
}
?>
<?php include 'footer.php'; ?>