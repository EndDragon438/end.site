// hide/show blinkies & buttons. accessibility!!
const blinkies = document.getElementsByClassName('button');
const animated = document.getElementsByClassName('animated');

function toggleButtons() {
	if (blinkies[0].style.display == 'none') {
		for (i=0; i<blinkies.length; i++) {
    		blinkies[i].style.display = 'inline';
  		}
	} else {
		for (i=0; i<blinkies.length; i++) {
    		blinkies[i].style.display = 'none';
  		}
	}
}

function toggleAnimations() {
	if (animated[0].style.display == 'none') {
		for (i=0; i<animated.length; i++) {
    		animated[i].style.display = 'inline';
  		}
	} else {
		for (i=0; i<animated.length; i++) {
    		animated[i].style.display = 'none';
  		}
	}
}