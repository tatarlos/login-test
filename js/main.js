$(document).ready(function(){
	
	var $loginBtn = $('.login-btn'),
	$form = $('form'),
	$logoutBtn = $('#logout'),
	name = $form.find('#name'),
	password = $form.find('#password');

	$loginBtn.on('click', function(e){
		e.preventDefault();		
		formData = {
			'action':'verify',
			'name':name.val(),
			'password':password.val(),
		}

		$.post("ajax.php",formData, function(data){
			if(data==="success"){
			window.location.href ="index.php";}		
		});
		
	});
	$logoutBtn.on('click',function(e){
		logic = {
			'action':'logout',
		}
		$.post("ajax.php",logic, function(data){
			console.log(data);
			window.location.href ="index.php";	
		});	
	});
});
