$(document).ready(function(){

	var jsonData = "";
	
	$.getJSON("ajax.php",data, function(data){
		cusineJson = data['cusineTypes'];
		atomosphereJson = data['atomosphere'];
		cusineLen = cusineJson.length;
		atmLen = atomosphereJson.length;

		for(i=0;i<cusineLen;i++){
			$('.option1 .sub-options-container').append("<div class='option-sub'>"+cusineJson[i].description+"<div>");
			if(i === cusineLen -1 ) {
				$('.option1 .sub-options-container').append("<div class='more'>More</div>");
			}
		}
		
		for(i=0;i<atmLen;i++){
			$('.option4').append("<div class='option-sub'>"+atomosphereJson[i].details+"<div>");
		}
	});

}):