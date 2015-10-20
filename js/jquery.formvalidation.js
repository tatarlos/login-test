function isValidEmail(email) {
	var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
	return  emailRx.test(email);
}

(function($){
	
	$.fn.formValidation = function(){
		
		return this.each(function(){

			var $form = $(this),
				$status = $form.find('.status'),
				$name = $form.find('#name'),
				$email = $form.find('#email'),
				$spam = $form.find('#spam'),
				$fields = $form.find('input[type=text], textarea');

			function seterror(errorMessage, $field){
				$status.html(errorMessage).show();
				$field.focus().addClass('error');				
			}
			// initailise
			$status.hide();

			$form.submit(function(e){
				e.preventDefault();
				$fields.removeClass('error');

				if(!$name.val()){
					seterror("Please enter your name", $name);
				}else if(!$email.val()){
					seterror("Please enter your email", $email);				
				}else if( !isValidEmail($email.val()) ){
					seterror("Please enter a valid email", $email);
				}else if($spam.val()){
					alert("your a robot");
				}else{
					$status.html("Computing").show();
					//send da email
					var 		formData = {
						'action':'register',
						'name': $name.val(),
						'email': $email.val(),
					}

					$.post("ajax.php",formData, function(result){
						$status.html(result).show();
					});
				}


			});

		});
	}	

})(jQuery)