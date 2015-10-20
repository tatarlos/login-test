<?php
	include 'connection.php';

function getOptions(){
	$c = getCusineTypes();
	$a = getAtomosphereTypes();
	echo json_encode(array_merge($c , $a));

}
function getCusineTypes(){
	global $connection;
	
	$sql ="SELECT name, description FROM cusine_type";

	$search = mysqli_query($connection, $sql); 
  
	while($row = mysqli_fetch_assoc($search)){
		 $result_array[] = $row;
	}
	return array('cusineTypes'=>$result_array);
	//echo json_encode($result_array);
}

function getAtomosphereTypes(){
	global $connection;
	
	$sql ="SELECT type, details FROM atomosphere";

	$search = mysqli_query($connection, $sql); 
  
	while($row = mysqli_fetch_assoc($search)){
		 $result_array[] = $row;
	}
	return array('atomosphere'=>$result_array);
}
// verify the user
function verify(){
	global $connection;

	$name = mysqli_real_escape_string($connection,$_POST['name']);
	$password = $_POST['password'];

	$sql ="SELECT password,priv,id FROM users WHERE username='$name' AND active='1'";
 	$search = mysqli_query($connection, $sql); 
  
	while($row = mysqli_fetch_assoc($search)){
		$hash= $row['password'];
		$id = $row['id'];
	}
	
	$match = password_verify($password, $hash);


	if($match){
		$test = ("success");

		$sql ="SELECT * FROM user_data WHERE user_id='$id'";
	 	$search = mysqli_query($connection, $sql); 
	  	
		while($row = mysqli_fetch_assoc($search)){
			$firstname= $row['first_name'];
			$lastname = $row['last_name'];
			$priv = $row['priv'];
			$pf_link = $row['img_link'];
		}
		$sql ="SELECT option_key, option_value FROM user_options WHERE user_id='$id'";
	 	$search = mysqli_query($connection, $sql); 
	  $useroptions =array();
		while($row = mysqli_fetch_assoc($search)){
			$useroptions[$row['option_key']] = $row['option_value'];
		}

		session_start();
		$_SESSION['user'] = array(
			'username'=>$name, 
			'id'=>$id, 
			'firstname'=>$firstname,
			'lastname' =>$lastname,
			'priv' =>$priv,
			'profile_pic_link' => $pf_link,
			);
		$_SESSION['user']['options'] = $useroptions;

	}else{
		$test = ("wrong info");	
	}
	echo($test);
	exit;
}

function logout(){

	session_start();
	// Unset all of the session variables.
	$_SESSION = array();

	// If it's desired to kill the session, also delete the session cookie.
	// Note: This will destroy the session, and not just the session data!
	if (ini_get("session.use_cookies")) {
	    $params = session_get_cookie_params();
	    setcookie(session_name(), '', time() - 42000,
	        $params["path"], $params["domain"],
	        $params["secure"], $params["httponly"]
	    );
	}

	// Finally, destroy the session.
	session_destroy();
}

function register(){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$hash = md5( rand(0,1000) ); // Generate random 32 character hash and assign it to a local variable.
  $password = rand(1000,9999); // Generates a random 4 diget pin
  global $connection;
  // $connection = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
  error_reporting(E_ALL && ~E_NOTICE);

	$to      = $email; // Send email to our user
	$subject = 'Signup | Verification'; // Give the email a subject 
	$message = '
	Thanks for signing up!
	Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.
 
	------------------------
	Username: '.$name.'
	Password: '.$password.'
	------------------------
	 
	Please click this link to activate your account:
	http://www.yourwebsite.com/verify.php?email='.$email.'&hash='.$hash.'
	 
	'; // Our message above including the link
	                     
	$headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
	//mail($to, $subject, $message, $headers); // Send our email

	$passwordhash = password_hash($password,PASSWORD_DEFAULT);

	$sql = "INSERT INTO users (username, password, email, hash) VALUES( '$name','$passwordhash','$email', '$hash')";

	if (mysqli_query($connection, $sql)) {
	    echo "Your registration was sent, please check your email to activate your account your password is $password";
	} else {
	    echo "Error: ".$sql."<br>".mysqli_error($connection);
	}

	mysqli_close($connection);
	}

// "UPDATE table
// SET column = 'content' , column = 'content'
// WHERE column = 'content' or column = 'content'
// "
// IN is OR
// "DELETE FROM table WHERE ..."

// "CREATE TABLE database name (column_name1 datatype NOT NULL UNIQUE PRIMARY KEY, column_name2 datatype REFERENCES movies(id) CHECK (duration > 0)
// CONSTRAINT name item (column, column2) )
// FOREIGN KEY (column name) REFERENCES table,

// DROP DATABASE database name;
// ALTER TABLE table ADD COLUMN column_name datatype;
// DROP column;
// foreign key
// "

// "SELECT count(*) sum(column) avg(column) max(column) min(conlumn)"//counts null values too unless column name given

// "SELECT genre, sum(cost)
// FROM movies
// GROUP BY genre
// HAVING COUNT(*) > 1;
// "

// "SELECT movies.title, reviews.review
// FROM movies
// INNER JOIN Reviews
// ON Movies.id = Reviews.movie_id

// SELECT Movies.title AS films, Genres.name "Reviews"
// FROM movies m
// INNER JOIN Movies_Genres
// ON Movies.id = Movies_genres.movie_id
// INNER JOIN Genres
// On Movies_genres.genre_id = Genres.id
// WHERE Movies.title = "Peter Pan"

// "

// "SELECT m.title r.review
// FROM Movies m
// LEFT OUTER JOIN Reviews r
// ON m.id = r.movie_id

// join is faster
// "

// "SELECT SUM(sales)
// FROM Movies
// WHERE id IN
// (SELECT movie_id
// FROM promotions
// WHere category = 'non-cash'
// )
// "

