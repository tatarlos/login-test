$(document).ready(function(){
	var $subContainer = $(".sub-options-container"),
			$options = $(".option"),
			$pickTitle = $('.pick-title'),
			$selectedOpt = $('.selected-options'),
			$result = $('.result'),
			$resultsCon = 	$('.results-container'),
			$resetBtn = $('.find-meal-reset'),
			currentIndex = -1,
			data = {'action':'getOptions'};
	//initalize

	selectedHasOpt();

	function selectedHasOpt(){
		$selectedOpt.each(function(){
			if($(this).children().length < 1){
				$(this).hide();
			}
		});
	}
	function resetOptions(){
		$('.selected .sub-options-container').slideToggle('medium');
		$('.selected').removeClass('selected');
		$('.option-sub').removeClass('option-selected');
		$selectedOpt.each(function(){
			item = $(this);
			if(item.children().length > 0){
				item.slideUp('medium').children().remove();
			}
		});
		currentIndex = -1;
	}
	function optionAnimation(){

		$selectedBar = $selectedOpt.eq(currentIndex);
		optionTarget = ".option"+(currentIndex+1);

		compare2(optionTarget , $options.eq(currentIndex).hasClass('selected'));

		//$arrow.eq(currentIndex).toggleClass("box_animate");
		$options.eq(currentIndex).toggleClass("selected");

		$subContainer.eq(currentIndex).slideToggle("medium");
		if($selectedBar.children().length > 0){
			$selectedBar.slideToggle("medium");
		}		
	}
	function compare1(option, selected){
		alreadySelected = false;
		$(option+' .option-sub').each(function(){
			optionText =$(this).text();
			if(selected){	
				template = "<div class='selected-container'><div class='delete'>X</div><div class = 'selected-text'>"+$(this).text()+"</div></div>";
				
				if($(this).hasClass('option-selected')){
					if($(option+" .selected-text").length < 1){
						$(option+' .selected-options').append(template);
					}else{
						alreadySelected = false;
						$(option+" .selected-text").each(function(){
							if($(this).text() === optionText ){
								alreadySelected = true;
								return;
							}
						});
						if(!alreadySelected){
							$(option+' .selected-options').append(template);
						}
					}
				}else{
					$(option+" .selected-text").each(function(){
						if($(this).text() === optionText ){
							$(this).parent().remove();
						}
					});
				}
			}else{
				alreadySelected = false;
				if($(option+" .selected-text").length < 1){
					alreadySelected = true;
					$(this).removeClass('option-selected');

				}else{
					$(option+" .selected-text").each(function(){	
						keepGoing = true;
						if($(this).text() === optionText ){
							alreadySelected = true;
							keepGoing = false;
						}
						return keepGoing;
					});
					if(!alreadySelected){
						$(this).removeClass('option-selected');	
					}
				}
			}

		});	
	}
	function compare2(option, selected){
		$currentOpt = $(option+' .option-sub');
		$choices =$(option+' .selected-options');
		if (selected) {
			$choices .empty();
			$(option+' .option-selected').each(function(){
				optionText =$(this).text();
				template = "<div class='selected-container'><div class='delete'>X</div><div class = 'selected-text'>"+$(this).text()+"</div></div>";
				$choices.append(template);
			});
		}else{
			$choices = $choices.children();
			$currentOpt.removeClass('option-selected');
			
			if($choices.length > 0 ){
				$choices.each(function(){
					optionText = $(this).children('.selected-text').text();
					$currentOpt.each(function(){
						if($(this).text() === optionText){
							$(this).addClass('option-selected');
						}
					})

				});
			}
		}
	}
	function matchOptionWithText($this, option, optionText){

		if($this.hasClass("option-selected")){
			$(option+' .selected-options').append(template);
		}else{
			$(option+" .selected-text").each(function(){
				if($this.text() === optionText ){
					$this.parent().remove();
				}
			});		
		}
	}
	//toggle-selected
	$options.on('click', '.option-sub', choiceToggle);
	//delete icon
	$options.on('click', '.delete', subtextDelete);
	//toggle options
	$options.on('click', '.pick-title', optionToggle);
	//reset options
	$resetBtn.on('click',resetOptions);
	
	function optionToggle(){
		newIndex = $pickTitle.index(this);
		if(currentIndex != -1){
			if( currentIndex != newIndex && $options.hasClass('selected')) {
				optionAnimation();
			}
		}
		currentIndex = newIndex;
		optionAnimation();
	}

	// $('.option6').click(function(){
	// 	$('.option-selected').each(function(){
	// 		console.log($(this).text())
	// 	})
	// })
	
	function choiceToggle(){
		$(this).toggleClass('option-selected');
	}
	function subtextDelete(){
		$item = $(this);
		$parent = $item.parents('.selected-options');
		$container = $item.parent();

		if($container.siblings().length > 0 ){
	    	$container.slideUp('medium', function(){
	    		$container.remove();
	    	});
	    }else{
			$parent.slideUp( "medium", function() {
	    		$container.remove();
	  		});
		}
	}
	$('.sub-options-container').on('click', '.more' ,function(){
		$('.more').remove()
		$("<div class='option-sub'>additional 1<div>").hide().appendTo('.option1 .sub-options-container').fadeIn(500);
		$("<div class='option-sub'>additional 2<div>").hide().appendTo('.option1 .sub-options-container').fadeIn(500);
		// $('.option1 .sub-options-container').appendto("<div class='option-sub'>additional 2<div>");
		$('.option1 .sub-options-container').append("<div class='more'>More</div>");
	});




	//registration validation
	$('.registration').formValidation();

	// login logout code
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
			console.log(data);
			if(data==="success"){
				window.location.href ="success.php";
			}else{
				alert("wrong info");
			}
		});
		
	});
	$logoutBtn.on('click',function(e){
		data = {
			'action':'logout',
		}
		$.post("ajax.php",data, function(data){
			window.location.href ="index.php";	
		});	
	});
	//end of login logout

	//search via json
	$.getJSON("livesearch.php", function(json){
		 jsonData = json;
	});
	
	$(document).ajaxStop(function() {
		$("#search").on("keyup", function(e) {

			// Set Search String
			var search_string = $(this).val(),
			results_string ="";
			// Do Search
			if (search_string === '') {
			}else{		
				l = jsonData.length;
				for(i=0;i<l;i++){
					name = jsonData[i].name;
					contains = (name.toUpperCase()).indexOf(search_string.toUpperCase());
					 if(contains >= 0 ){
					 	results_string += name+"<br>";
					 }
				}
				$("#search-string").html(results_string);
			}
		});
	});
	//end of search via json
});
