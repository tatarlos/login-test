$(document).ready(function(){
	
	var $loginBtn = $('.login-btn'),
	$form = $('form'),
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
			console.log(data);
		});
		
	})
});
