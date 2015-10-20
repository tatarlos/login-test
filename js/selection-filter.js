$(document).ready(function(){
	
	var $optionToggle,
	function selectedHasOpt(){
		$selectedOpt.each(function(){
			if($(this).children().length < 1){
				$(this).hide();
			}
		});
	}
	function resetOptions(){
		$('.option-sub').removeClass('option-selected');
		$('.selected-container').remove();
		$selectedOpt.hide();
	}
	function optionAnimation(){
		$selectedBar = $selectedOpt.eq(currentIndex);
		optionTarget = ".option"+(currentIndex+1);
		compare1(optionTarget , $options.eq(currentIndex).hasClass('selected'));
		//$arrow.eq(currentIndex).toggleClass("box_animate");
		$options.eq(currentIndex).toggleClass("selected");
		$subContainer.eq(currentIndex).slideToggle("slow");
		if($selectedBar.children().length > 0){
			$selectedBar.slideToggle("slow");
		}		
	}
	//toggle-selected
	$pickTitle.click(function(){
		newIndex = $pickTitle.index(this);
		if(currentIndex != -1){
			if( currentIndex != newIndex && $options.eq(currentIndex).hasClass('selected')){
				optionAnimation();
			}
		}
		currentIndex = newIndex;
		optionAnimation();
	});

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

	//add and remove
	function addSelectionClicks(option){

		$(option).on({"click": function(){
			
			$(this).toggleClass("option-selected");


		}},".option-sub");

		$(option).on('click', '.delete', function(){
			$currentSelectedOpt = $(option+" .selected-options");
			if($currentSelectedOpt.children().length <= 1 ){
	    	$currentSelectedOpt.slideUp("medium");
	    	$(this).parent().remove();
	    }else{
				$(this).parent().slideUp( "medium", function() {
		    	$(this).remove();
		  	});
			}
		});
	}

	$('.sub-options-container').on('click', '.more' ,function(){
		$('.more').remove()
		$("<div class='option-sub'>additional 1<div>").hide().appendTo('.option1 .sub-options-container').fadeIn(500);
		$("<div class='option-sub'>additional 2<div>").hide().appendTo('.option1 .sub-options-container').fadeIn(500);
		$('.option1 .sub-options-container').append("<div class='more'>More</div>");
	});
});