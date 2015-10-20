
	// $(option).on({"click": function(){	
	// 	$(this).toggleClass("option-selected");
	// }},".option-sub");

	function scrollAnimation(){
		$('html, body').stop().animate({
      scrollLeft: $('.result'+currentScreen.toString()).offset().left,
      scrollTop: $('.result'+currentScreen.toString()).offset().top
    }, 500);
	}
	function snapbackAnimation(){
		$('html, body').stop().animate({
      scrollLeft: $('.result'+currentScreen.toString()).offset().left,
    }, 500);
	}
	function mouseScrolling(){
		var curYPos = 0,
		  	curXPos = 0,
		  	screenX = 0,
		  	screenY = 0,
		  	threshold = 150,
		  	curDown = false,
		  	snap = false,
		  	direction = "none";

		window.addEventListener('mousemove', function(e){

			currentpageX = Math.max(document.body.scrollLeft , document.documentElement.scrollLeft);
			currentpageY = Math.max(document.body.scrollTop , document.documentElement.scrollTop);
			if(curDown === true){
				//console.log(currentpageY + " - "+curYPos +" - "+ e.pageY)
			  window.scrollTo( currentpageX+ (curXPos - e.pageX), currentpageY + (curYPos - e.pageY));

			}
		});

		window.addEventListener('mousedown', function(e){ 
			curDown = true; 
			snap = false;
			reverseSnap = false;
			curYPos = e.pageY; 
			curXPos = e.pageX;
			screenX = e.screenX;
			screenY = e.screenY;
		});

		window.addEventListener('mouseup', function(e){
			screenXRest = e.screenX;
			screenYRest = e.screenY;
			curDown = false; 
			if(screenX - screenXRest > 0){
				direction = "right";
			}else if(screenX - screenXRest < 0){
				direction ="left";
			}else{
				direction ="none";
			}
			if(direction === 'right'){
				if(screenX - screenXRest > threshold){
					snap = true;
				}				
				if(snap){
					(currentScreen < 2)? currentScreen +=1 : currentScreen = 3;
					scrollAnimation();

				}else{
					snapbackAnimation();
				}

			}else if(direction ==="left"){
				if( screenXRest- screenX > threshold){
					snap = true;
				}				
				if(snap){
					(currentScreen > 1)? currentScreen -=1 : currentScreen = 1;
					scrollAnimation()
				}else{
					snapbackAnimation();
				}			
			}
		});
	}
	function mouseMoveHandler(){
		var curYPos = 0,
  	curXPos = 0,
  	threshold = 100,
  	leash = 30,
  	curDown = false,
  	snap = false,
  	marginLeft = 0,
  	moveDirX = 0,
  	moveDirY= 0,
  	theta = 1000,
  	ymovement = 0,
  	calculateAngle = true,
  	leftright = false,
  	startingMargin = 0,
  	direction = "none";

		window.addEventListener('mousemove', function(e){
			e.preventDefault();
			if(curDown === true){
				moveDirX = e.screenX - curXPos;
				moveDirY = e.screenY - curYPos;
				if(calculateAngle){
					if(Math.abs(moveDirX) > leash || Math.abs(moveDirY) > leash){
						moveDirY = e.screenY - curYPos;
						theta = Math.atan2(-moveDirY , moveDirX);
						if (theta < 0){theta += 2 * Math.PI};
						theta = theta*180/Math.PI;
						calculateAngle = false;
					}
				}
 				if(theta !=1000){
					if( 160 < theta && theta < 200 || theta < 30 || theta > 340 ){
						leftright = true
						marginLeft = startingMargin + moveDirX;
						$resultsCon.css('margin-left', marginLeft)
					}else{	
						if( (marginTop + moveDirY) <='0' && Math.abs(marginTop + moveDirY +10) < height){ 
							ymovement = marginTop + moveDirY;
							$currentResult.css('margin-top', ymovement);
						}	
					}
				}
			}
		});

		window.addEventListener('mousedown', function(e){
			curDown = true; 
			snap = false;
			reverseSnap = false;
			calculateAngle = true;
			leftright = false;
			theta = 1000;
			curXPos = e.screenX;
			curYPos = e.screenY;
		});

		window.addEventListener('mouseup', function(e){
			e.preventDefault();
			curDown = false;						
			if(leftright){
				if(moveDirX < 0){direction = "left";}else{direction = "right";}
			}else{
				if(moveDirY < 0){direction = "up"}else{direction = "down"}
			}

			if(Math.abs(moveDirX) < threshold  ){
				startingMargin = (-currentScreen*windowWidth).toString();
				$resultsCon.animate({ marginLeft: startingMargin
    		}, 300);	
			}else{
				if(direction ==="left"){
					startingMargin = -(windowWidth*currentScreen);
					if(currentScreen > 1 ){
						$resultsCon.animate({ marginLeft: startingMargin
		    		}, 300);
					}else{
						currentScreen++;
						startingMargin = -(windowWidth*currentScreen);
						$resultsCon.animate({ marginLeft: startingMargin
		    		}, 300);
	    		}
    		}else if(direction === "right"){
    			startingMargin = -(windowWidth*currentScreen);
    			if(currentScreen < 1 ){
    				$resultsCon.animate({ marginLeft: startingMargin
		    		}, 300);

    			}else{
    				currentScreen--;
    				startingMargin = -(windowWidth*currentScreen);
						$resultsCon.animate({ marginLeft: startingMargin
		    		}, 300);
	    		}
    		}else if(direction === "up"){}
    		else if(direction ==="down"){} 
			}
			$currentResult = $('.result'+(currentScreen+1).toString());
  		height = $currentResult.outerHeight() - $(window).height();
  		windowWidth = $(window).width();
			marginTop = parseInt($currentResult.css('margin-top'));
  	
		});
	}
	function scrollHandler(){
		var scrollAmount = 40;
		window.addEventListener('wheel', function(e){
  		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	  	if( delta < 0){
	  		if( Math.abs(marginTop) < height){marginTop -= scrollAmount;}
	  		$currentResult.css('margin-top', marginTop);

	  	}else{
	  		if(marginTop <'0'){marginTop += scrollAmount;}
	  		$currentResult.css('margin-top', marginTop);
	  	}
  	}, false);
	}

// function circ(progress) {
	//     return 1 - Math.sin(Math.acos(progress))
	// }

	// function bounce(progress) {
	//   for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
	//     if (progress >= (7 - 4 * a) / 11) {
	//       return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
	//     }
	//   }
	// }

	// function makeEaseOut(delta) {  
	//   return function(progress) {
	//     return 1 - delta(1 - progress)
	//   }
	// }
	// var circEaseOut = makeEaseOut(circ);
	// var bounceEaseOut = makeEaseOut(bounce);

	// function move(element,duration, distance ,delta) {

	//  animate({
	//     delay: 10,
	//     duration: duration || 1000, // 1 sec by default
	//     delta: delta,
	//     step: function ani(delta) {
	//       marginMove = marginTop + distance*delta;
	//       element.css('margin-top', marginMove);    
	//     }
	//   })
	  
	// }

	// function animate(opts) {
	// 	var start = new Date  

	//   var id = setInterval(function() {
	// 	  var timePassed = new Date - start
	// 	  var progress = timePassed / opts.duration
		  
	// 	  if (progress > 1) progress = 1
	// 	  var delta = opts.delta(progress)
	// 	  opts.step(delta)

	// 	  if(parseInt($currentResult.css('margin-top')) > 0){
	// 	  	$currentResult.css('margin-top' , 0);
	// 	  	clearInterval(id);
	// 	  }
	// 	  if(Math.abs(parseInt($currentResult.css('margin-top'))) > height ){
	// 	  	$currentResult.css('margin-top' , -height);
	// 	  	clearInterval(id);
	// 	  }
	// 	  if (progress == 1) {
	// 	  	clearInterval(id)
	// 	  }
	//   }, opts.delay || 10)
	// }
