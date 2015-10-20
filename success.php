<?php 
include 'header.php';
?>
<p><?php echo $user['firstname']." ".$user['lastname']; ?> </p>
<?php 

$imglink = $user['profile_pic_link'];
//echo ("<img src=$imglink />");

//$len = sizeof($user[options]);

foreach ($user['options'] as $key => $option):
	echo $key.": ".$option."<br>";
endforeach;
?>
<div class="options">
	
	<div class="option1">
		<h3>Cusine Type</h3>
	</div>
	
	<div class="option2">
		<h3>Location</h3>
	</div>

	<div class="option3">
		<h3>Time</h3>
		<div class="option-sub">1</div>
	</div>

	<div class="option4">
		<h3>Atomosphere</h3>
	</div>

	<div class="option5">
		<h3>Other Options</h3>
		<div class="option-sub">1</div>
	</div>

</div>

<?php include 'footer.php'; ?>