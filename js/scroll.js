$(document).ready(function(){
var view, images, left, center, right,
        index, count, offset, snap,
        pressed, reference, amplitude, target, velocity, timeConstant,
        xform, frame, timestamp, ticker;

    function initialize() {
        var i, stash, el;

        count = 2;
        results = [];
        index = 0;
        offset = 0;
        tosnap = 0;
        timeConstant = 125; // ms
        pressed = false;

        snap = window.innerWidth;
        view = document.getElementById('content');
    }

    function setupEvents() {
        if (typeof window.ontouchstart !== 'undefined') {
            view.addEventListener('touchstart', tap);
            view.addEventListener('touchmove', drag);
            view.addEventListener('touchend', release);
        }else{
        view.addEventListener('mousedown', tap);
        view.addEventListener('mousemove', drag);
        view.addEventListener('mouseup', release);
    }


    function display(i) {
        if(i > index){
            index = i;
        }else if(i < index){
            i = index;
        }
        view.style[xform] = 'translate3d(' +(-snap*index) + 'px, 0, 0)';
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
            delta = amplitude * Math.exp(-elapsed / timeConstant);
            if (delta > 10 || delta < -10) {
                scroll(target - delta);
                requestAnimationFrame(autoScroll);
            } else {
                display(index + tosnap);
            }
        }
    }

    function tap(e) {
        pressed = true;
        reference = xpos(e);

        velocity = amplitude = 0;
        frame = offset;
        timestamp = Date.now();
        clearInterval(ticker);
        ticker = setInterval(track, 100);

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function drag(e) {
        var x, delta;
        if (pressed) {
            x = xpos(e);
            delta = reference - x;
            if (delta > 2 || delta < -2) {
                reference = x;
                scroll(offset + delta);
            }
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function release(e) {
        pressed = false;
        clearInterval(ticker);
        target = offset;
        if (velocity > 10 || velocity < -10) {
            amplitude = 1.2 * velocity;
            target = offset + amplitude;
        }
        
        tosnap = (target > snap*.7)? 1 : 0;

        target = tosnap * snap; 

        amplitude = target - offset;
        console.log(amplitude);
        timestamp = Date.now();
        requestAnimationFrame(autoScroll);

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    xform = 'transform';
    ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
            xform = e;
            return false;
        }
        return true;
    });
    initialize();
    setupEvents();
    display(0);


})