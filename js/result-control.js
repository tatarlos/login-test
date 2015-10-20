	function touchHandler(){
		var curYPos = 0,
		  	curXPos = 0,
		  	threshold = 100,
		  	leash = 20,
		  	snap = false,
		  	marginLeft = 0,
		  	moveDirX = 0,
		  	moveDirY= 0,
		  	theta = 1000,
		  	ymovement = 0,
		  	currentY = 0,
		  	finalDistance = 0,
		  	calculateAngle = true,
		  	leftright = false,
		  	startingMargin = 0,
		  	velocity = amplitude = offset = min = 0,
		  	timestamp,frame,ticker,
		  	direction = "none",
				timeConstant = 225;

		window.addEventListener('touchstart', function(e){
			var touchobj = e.changedTouches[0];
			direction ='none';
			calculateAngle = true;
			leftright = false;
			theta = 1000;
			moveDirY = 0,
			moveDirX = 0,
			curXPos = touchobj.screenX;
			curYPos = touchobj.screenY;

			velocity = amplitude = 0;
		  timestamp = Date.now();
		  clearInterval(ticker);
		  ticker = setInterval(track, 100);

			$currentResult = $('.result'+(currentScreen+1).toString());
  		height = $currentResult.outerHeight() - $(window).height();
  		windowWidth = $(window).width();
			marginTop = parseInt($currentResult.css('margin-top'));
			offset = marginTop ;
			frame = offset;
			startTime = new Date().getTime();
		});

		window.addEventListener('touchmove', function(e){
			var touchobj = e.changedTouches[0];
			e.preventDefault();
			finalDistance = Math.abs(currentY - touchobj.screenY);
			currentY = touchobj.screenY;
			moveDirX = touchobj.screenX - curXPos;
			moveDirY = currentY - curYPos;
			if(calculateAngle){
				if(Math.abs(moveDirX) > leash || Math.abs(moveDirY) > leash){
					moveDirY = currentY - curYPos;
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
						ymovement = marginTop + moveDirY;
						scroll(ymovement);	
				}
			}
		});

		window.addEventListener('touchend', function(e){

			clearInterval(ticker);
			marginTop = parseInt($currentResult.css('margin-top'));		
			if(leftright){
				if(moveDirX < 0){direction = "left";}else{direction = "right";}
			}else{
				if(moveDirY < 0){direction = "down"}else{direction = "up"}
			}
			if(Math.abs(moveDirX) < threshold  ){
				startingMargin = -currentScreen*windowWidth;
				$resultsCon.animate({ marginLeft: startingMargin
    		}, 200);	
			}else{
				if(direction ==="left"){
					if(currentScreen > 1 ){
						$resultsCon.animate({ marginLeft: startingMargin
		    		}, 200);
					}else{

						currentScreen++;
						console.log(currentScreen);
						startingMargin = -(windowWidth*currentScreen);
						//console.log(target);
						$resultsCon.animate({ marginLeft: startingMargin
		    		}, 200);
	    		}
    		}else if(direction === "right"){
    			if(currentScreen < 1 ){
    				$resultsCon.animate({ marginLeft: startingMargin
		    		}, 200);
    			}else{
    				currentScreen--;
    				startingMargin = -(windowWidth*currentScreen);
						$resultsCon.animate({ marginLeft: startingMargin
		    		}, 200);
	    		}
    		}
			}
			if(direction ==="up" || direction ==="down"){
				if (velocity > 10 || velocity < -10) {
					console.log(offset);
		        amplitude = 0.8 * velocity;
		        target = Math.round(offset + amplitude);
		        timestamp = Date.now();
		        console.log(amplitude)
		        console.log(target)
		        requestAnimationFrame(autoScroll);

		    }
	    }
		});

		function scroll(y){
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
	          scroll(target + delta);
	          requestAnimationFrame(autoScroll);
	      } else {
	          scroll(target);
	      }
	    }
		}
	}