// TAB & TAB SELECTOR IMPLEMENTATION //

// This is no longer in use, and has been replace by a NoJS implementation, which you can find at /stylesheets/tabs.css

const tabs = document.getElementsByClassName('tab');

if (document.getElementsByClassName('tabSelector')) {
	// hide all tabs
	for (i=0; i<tabs.length; i++) {
		tabs[i].style.display = 'none';
	}
	if (document.getElementsByClassName('defaultTab')) {
		document.getElementsByClassName('defaultTab')[0].style.display = "block";
	}
}

function swapTab(event, tab) {
	const tabButtons = document.getElementsByClassName('tabButton');
	for (i=0; i<tabButtons.length; i++) {
	    tabButtons[i].className = tabButtons[i].className.replace(" active", "");
	}
	for (i=0; i<tabs.length; i++) {
		tabs[i].style.display = 'none';
	}
	document.getElementById(tab).style.display = "block";
	event.currentTarget.className += " active";
}