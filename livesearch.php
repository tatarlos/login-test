<?php
require_once 'connection.php';
	
	if(isset( $_GET['action']) ){
		$action = $_GET['action'];
	}else{
		$action = "";
	}
	
	var_dump($action);
	$action();

  function livesearch(){
  //return data via json
	  $sql = "SELECT name FROM `Restaurants`";
	  $resultRS = mysqli_query($connection, $sql) or die("Error querying DB");
	  
	  while($results = $resultRS->fetch_array()){ 
	    $result_array[] = $results;      
	  }
	  echo json_encode($result_array);
	}



?>