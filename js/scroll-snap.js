$(document).ready(function(){

	var curYPos,curXPos,deltaX,deltaY,leftright,timestamp,frame,view,xform,ticker,windowWidth,height,target,ticked,velocity,amplitude;
	  	threshold = 100,
	  	leash = 20,
	  	theta = 1000,
	  	calculateAngle = true,
	  	startingMargin = min = 0,
			timeConstant = 325, //ms
			currentScreen = 0,
			marginTop = 0,
			offset = 0,
			tickerTime = 80,
			count = $('.result').length,
			$currentResult = $('.result1'),
			$resultsCon = 	$('.results-container'),
			height = $currentResult.outerHeight() - window.innerHeight,
			windowWidth = window.innerWidth;

	function setupEvents(){
    if (typeof window.ontouchstart !== 'undefined') {
        window.addEventListener('touchstart', tap);
        window.addEventListener('touchmove', drag);
        window.addEventListener('touchend', lift);
    }else{
    window.addEventListener('mousedown', tap);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', lift);
    }
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
				if(currentScreen < count-1 ){
					currentScreen++;
					startingMargin = -(windowWidth*currentScreen);
					updateView();
    		}
  		}else{
  			//direction left
  			if(currentScreen > 0 ){
  				currentScreen--;
  				startingMargin = -(windowWidth*currentScreen);
  				updateView();
    		}
  		}
		}
		$resultsCon.animate({ marginLeft: startingMargin}, 200);
	}
	function tap(e){
		//sets default values
		calculateAngle = true;
		leftright = false;
		theta = 1000;
		//velocity = No of pixels per tick amp is amount to travel compared with velocity
		deltaY = deltaX = velocity = amplitude = 0;
		curXPos = xpos(e);
		curYPos = ypos(e);

	  timestamp = Date.now();
	  clearInterval(ticker);
	  ticker = setInterval(track, tickerTime);
		marginTop = offset;
		frame = offset;
	}
	function updateView(){
		//updates the variables to match the current view
		$currentResult = $('.result'+(currentScreen+1).toString());
		height = $currentResult.outerHeight() - window.innerHeight;
		marginTop = parseInt($currentResult.css('margin-top'));
		offset = marginTop;
	}
	function drag(e){
		var marginLeft,ymovement;
		e.preventDefault();
		deltaX = xpos(e) - curXPos;
		deltaY = ypos(e) - curYPos;

		//calculate angle of movement to determine whether horizontal or vertical
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
		//draws while dragging
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
		//matches position of magrin to offset
		marginTop += offset;
		if(leftright){
			snapF();
		}else{
			target = offset;
			if (velocity > 10 || velocity < -10) {
        amplitude = 0.8 * velocity;
        target = Math.round(offset + amplitude);
	    }
	    timestamp = Date.now();
      requestAnimationFrame(autoScroll);
		}
	}
	function scrollY(y){
		offset = (y < -height) ? -height : (y > min) ? min : y;
		$currentResult.css('margin-top', offset);
	}
	function track() {
	  var now, elapsed, delta, v;

	  now = Date.now();
	  elapsed = now - timestamp;
	  timestamp = now;
	  //calculates distance traveled between ticks
	  delta = offset - frame;
	  frame = offset;
	  //calculates velocity
	  v = 1000 * delta / (1 + elapsed);
	  velocity = 0.7 * v + 0.3 * velocity;
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
	setupEvents();
});
