// adding header sitewide
const headerHTML = `
<a href="/index.html" class="logo">
  <img src="/resources/images/aroace_dragon.PNG" style="width:63%;" alt="back to home!">
</a>
<h3 class="alternate" style="float:left;padding:15px 0 15px 25px;font-size:25px;">end.site</h3><br>
<span class="clickyButtons"><button type="button" onclick="toggleButtons()">Toggle Buttons</button> <button type="button" onclick="toggleAnimations()">Toggle Animations</button></span>
<span class="header-right">
  <a href="/pages/about/index.html">About</a>
  <a href="/pages/blog/index.html">Blog</a>
  <a href="/pages/projects/index.html">Creations</a>
  <a href="/pages/socials/index.html">Socials</a>
  <a href="/pages/links/index.html">Linkies</a>
</span>`;

if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}


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