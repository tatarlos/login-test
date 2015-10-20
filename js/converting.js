	initialize();
	setupEvents();
	//data variables
	var jsonData = "",
			$arrow = $(".arrow"),
			$subContainer = $(".sub-options-container"),
			$options = $(".option"),
			$pickTitle = $('.pick-title'),
			$selectedOpt = $('.selected-options'),
			$result = $('.result'),
			$resultsCon = 	$('.results-container'),
			currentIndex = -1,

		
		
			data = {'action':'getOptions'};

	//scrolling variables
	var curYPos,  curYPos,  deltaX,  deltaY, height,
			leftright,  timestamp,  frame,  ticker, 
			ticked,  startingMargin,  threshold,
			leash,  theta,  calculateAngle, windowWidth,
			velocity,  amplitude, marginTop, currentScreen,
			offset,  min,  timeConstant,  threshold, 
			$currentResult;

	function initialize() {
		//scrolling variables
		threshold = 100;
  	leash = 20;
  	theta = 1000,
  	currentScreen = 0;
  	// currentScreen = startingMargin = velocity = amplitude = offset = min = 0;
		timeConstant = 225;
	}
	function setupEvents(){
    if (typeof window.ontouchstart !== 'undefined') {
        window.addEventListener('touchstart', tap);
        window.addEventListener('touchmove', drag);
        window.addEventListener('touchend', lift);
    }
    window.addEventListener('mousedown', tap);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', lift);
	}
  function ypos(e) {
    // touch event
    if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].screenY;
    }
    // mouse event
    return e.clientY;
	}
  function xpos(e) {
    // touch event
    if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].screenX;
    }
    // mouse event
    return e.clientX;
	}
	function snapF(){
		if(Math.abs(deltaX) < threshold  ){
			startingMargin = -currentScreen*windowWidth;	
		}else{
			//direcion right
			if(deltaX < 0){
				if(currentScreen < 2 ){
					currentScreen++;
					startingMargin = -(windowWidth*currentScreen);
    		}
  		}else{
  			//direction left
  			if(currentScreen > 0 ){
  				currentScreen--;
  				startingMargin = -(windowWidth*currentScreen);
    		}
  		}
		}
		$resultsCon.animate({ marginLeft: startingMargin}, 200);
	}
	function tap(e){
		calculateAngle = true;
		leftright = false;
		theta = 1000;
		//velocity = No of pixels per tick amp is amount to travel compared with velocity
		deltaY = deltaX = velocity = amplitude = 0;
		curXPos = xpos(e);
		curYPos = ypos(e);

	  timestamp = Date.now();
	  clearInterval(ticker);
	  ticker = setInterval(track, 100);
		$currentResult = $('.result'+(currentScreen+1).toString());
		height = $currentResult.outerHeight() - window.innerHeight;
		windowWidth = window.innerWidth;
		marginTop = parseInt($currentResult.css('margin-top'));
		offset = marginTop;
		frame = offset;
	}
	function drag(e){
		var marginLeft,ymovement;
		e.preventDefault();
		deltaX = xpos(e) - curXPos;
		deltaY = ypos(e) - curYPos;
		if(calculateAngle){
			if(Math.abs(deltaX) > leash || Math.abs(deltaY) > leash){
				theta = Math.atan2(deltaY , deltaX);
				if (theta < 0){theta += 2 * Math.PI};
				theta = theta*180/Math.PI;
				calculateAngle = false;
				if( 160 < theta && theta < 200 || theta < 30 || theta > 340 ){
					leftright = true;
				}
			}
		}

		if(!calculateAngle){
			if(leftright){
				marginLeft = startingMargin + deltaX;
				$resultsCon.css('margin-left', marginLeft)
			}else{	
					ymovement = marginTop + deltaY;
					scrollY(ymovement);	
			}
		}
	}
	function lift(e){
		clearInterval(ticker);
		marginTop += offset;
		if(leftright){
			snapF();
		}else{
			target = offset;
			if (velocity > 10 || velocity < -10) {
        amplitude = 0.4 * velocity;
        target = Math.round(offset + amplitude);

	    }
	    timestamp = Date.now();
      requestAnimationFrame(autoScroll);
		}
	}
	function scrollY(y){
			offset = (y < -height) ? -height : (y > min) ? min : y;
			$currentResult.css('margin-top', offset)
	}
	function track() {
	  var now, elapsed, delta, v;
	  now = Date.now();
	  elapsed = now - timestamp;
	  timestamp = now;
	  delta = offset - frame;
	  frame = offset;
	  v = 1000 * delta / (1 + elapsed);
	  velocity = 0.8 * v + 0.2 * velocity;
	}
	function autoScroll() {
    var elapsed, delta;
    if (amplitude) {
      elapsed = Date.now() - timestamp;
      delta = -amplitude * Math.exp(-elapsed / timeConstant);
      if (delta > 1 || delta < -1) {
          scrollY(target + delta);
          requestAnimationFrame(autoScroll);
      } else {
          scrollY(target);
      }
    }
	}