/* THIS SECTION IS FOR STUFF THAT MUST BE UPDATED CONSTANTLY */

// array of post JSONs
const postList = ["peril_the_adventurer.json", "amaranth_bio.json"];

// postArray idea taken from Zonelets, i hope to make something requiring less effort in the future but that might need some backend, so it goes to the bottom of the list
const postArray = ["2024-04-27_Welcome-to-end.site!!!.html"];

// list of all tags in use
const tagsList = ["2d", "3d", "writing", "music", "games", "other", "dragon", "wof", "pride", "2023", "2024", "oc-amaranth", "oc-borealis", "oc-gharial", "oc-moon_moon", "oc-saguaro", "oc-sierra", "oc-snowreader", "webdev"];
tagsList.sort();


/* ONTO THE FUNCTIONS!!! */





// adding header sitewide
const headerHTML = `
<a href="/index.html" class="logo">
  <img src="/resources/images/aroace_dragon.PNG" style="width:63%;">
</a>
<h3 class="alternate" style="float:left;padding:15px 0 15px 25px;font-size:25px;">end.site</h3>
<div class="clickyButtons"><button type="button" onclick="toggleButtons()">Toggle Buttons</button> <button type="button" onclick="toggleAnimations()">Toggle Animations</button></div>
<div class="header-right">
  <a class="active" href="/pages/about/index.html">About</a>
  <a class="active" href="/pages/blog/index.html">Blog</a>
  <a class="active" href="/pages/projects/index.html">Creations</a>
  <a class="active" href="/pages/socials/index.html">Socials</a>
  <a class="active" href="/pages/links/index.html">Linkies</a>
</div>`;

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

// TAB & TAB SELECTOR IMPLEMENTATION //
const tabs = document.getElementsByClassName('tab');

if (document.getElementsByClassName('tabSelector')) {
	// hide all tabs
	for (i=0; i<tabs.length; i++) {
		tabs[i].style.display = 'none';
	}
	document.getElementById('bio').style.display = "block";
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

// formatting blog posts
if (document.getElementById("dt-published")) {
  const retrieveElement = document.getElementById("dt-published");
  const datetime = retrieveElement.getAttribute("datetime");
  const datetimeArray = datetime.split("-");
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthArray[datetimeArray[1] - 1];
  retrieveElement.innerHTML = datetimeArray[3] + " | " + monthName + " " + datetimeArray[2] + ", " + datetimeArray[0];
}

// populate Blog page
function listBlogPosts() {
  const listElement = document.getElementById("blogPosts");
  for (i=0; i<postArray.length; i++) {
    const post = postArray[i];
    const date = post.substring(0, 10);
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthArray[date.substring(5,7)-1];
    const title = post.substring(11).replace(/-/g, " ").replace(/.html/, "");
    const thumbnail = `<li><a href="/pages/blog/pages/${postArray[i]}">${title} | ${monthName} ${date.substring(8,10)}, ${date.substring(0,4)}</a></li>`;
    listElement.insertAdjacentHTML("beforeend", thumbnail);
  }
}


// TAG SYSTEM IMPLEMENTATION //

function listTags() {
  const listElement = document.getElementById("tagList");
  for (i=0; i<tagsList.length; i++) {
    const tagList = document.getElementById("tagList");
    const node = document.createElement("li");
    const textnode = document.createTextNode(`<a href="/pages/projects/tags/${tagsList[i]}">${tagsList[i]}</a>`);
    node.appendChild(textnode);
    const testNode = `<li><a href="/pages/projects/tags/${tagsList[i]}.html">${tagsList[i]}</a></li>`;
    tagList.insertAdjacentHTML("beforeend", testNode);
  }
  //createTagPage(tagsList[i]); NOT IMPLEMENTED
}

// populate a Tag Page with posts including that tag
async function populateTags(tagName) {
	document.getElementsByClassName("tagPage")[0].insertAdjacentHTML("afterbegin", `<h1>Tagged: ${tagName}</h1>`)
	for (i=0; i<postList.length; i++) {
		const response = await fetch("/posts/" + postList[i]);
		const postJSON = await response.json();
		const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const monthName = monthArray[postJSON.postDate.substring(5,7)-1];
		const thumbnail = `<li><a href="/pages/projects/${postJSON.postType}/${postJSON.postTitle.toLowerCase().replace(/ /g, '_')}.html">${postJSON.postTitle} | ${monthName} ${postJSON.postDate.substring(8,10)}, ${postJSON.postDate.substring(0,4)}</a></li>`;
		for (n=0; n<postJSON.postTags.length; n++) {
			if (postJSON.postTags[n] === tagName) {
				document.getElementById("pageList").insertAdjacentHTML("beforeend", thumbnail);
			}
		}
	}
}

// link tags on posts to their correct Tag Pages
function linkTags() {
  const rawList = document.getElementById("tags").innerHTML;
  const tagArray = rawList.substring(6).split(",");
  tagArray.sort();
  let linkedTags = 'tags: ';
  for (i=0; i<tagArray.length; i++) {
    linkedTags += `<a href="/pages/projects/tags/${tagArray[i]}.html">${tagArray[i]}</a>, `;
  }
  linkedTags = linkedTags.slice(0, linkedTags.length - 2);
  document.getElementById("tags").innerHTML = linkedTags;
}

// default youtube link => youtube embed link
function embedYoutube(url) {
	if (url.slice(0, 17) == "https://youtu.be/") {
		return `https://www.youtube.com/embed/${url.substr(16)}`;
	} else if (url.slice(0, 32) == "https://www.youtube.com/watch?v=") {
		return `https://www.youtube.com/embed/${url.substr(32)}`;
	} else {
		return "https://www.youtube.com/embed/dQw4w9WgXcQ";
	}
}

// parsing post JSON to turn into a post page
// TODO: customize generated layout depending on postType
async function parsePost(url) {
	const response = await fetch(url);
	const postJSON = await response.json();
	let output = "";
	if (postJSON.postType == "2d") {
		output = `
		<div class="creation-side">
			<p>${postJSON.postTitle}</p>
			<iframe src="${embedYoutube(postJSON.postTimelapse)}" frameborder="0" allowfullscreen></iframe>
			<p class="creation-description">
			  ${postJSON.postText}
			</p>
			<p id="tags">tags: ${postJSON.postTags}</p>
		</div>
		<img class="creation-content" src="/pages/projects/${postJSON.postType}/resources/${postJSON.postContent}"/>
		`;
	} else if (postJSON.postType == "3d") {
		output = `
		<div class="creation-side">
			<p>${postJSON.postTitle}</p>
			<iframe src="${embedYoutube(postJSON.postTimelapse)}" frameborder="0" allowfullscreen></iframe>
			<p class="creation-description">
			  ${postJSON.postText}
			</p>
			<p id="tags">tags: ${postJSON.postTags}</p>
		</div>
		<img class="creation-content" src="/pages/projects/${postJSON.postType}/resources/${postJSON.postContent}"/>
		`;
	} else if (postJSON.postType == "games") {
		output = `
		<div class="creation-side">
			<p>${postJSON.postTitle}</p>
			<iframe src="${embedYoutube(postJSON.postTimelapse)}" frameborder="0" allowfullscreen></iframe>
			<p class="creation-description">
			  ${postJSON.postText}
			</p>
			<p id="tags">tags: ${postJSON.postTags}</p>
		</div>
		<img class="creation-content" src="/pages/projects/${postJSON.postType}/resources/${postJSON.postContent}"/>
		`;
	} else if (postJSON.postType == "music") {
		output = `
		<div class="creation-side">
			<p>${postJSON.postTitle}</p>
			<iframe src="${embedYoutube(postJSON.postTimelapse)}" frameborder="0" allowfullscreen></iframe>
			<p class="creation-description">
			  ${postJSON.postText}
			</p>
			<p id="tags">tags: ${postJSON.postTags}</p>
		</div>
		<img class="creation-content" src="/pages/projects/${postJSON.postType}/resources/${postJSON.postContent}"/>
		`;
	} else if (postJSON.postType == "writing") {
		output = `
		<div class="creation-side">
			<p>${postJSON.postTitle}</p>
			<p class="creation-description">
			  ${postJSON.postText}
			</p>
			<p id="tags">tags: ${postJSON.postTags}</p>
		</div>
		<img class="creation-content" src="/pages/projects/${postJSON.postType}/resources/${postJSON.postContent}"/>
		`;
	} else {
		if (postJSON.postTitle) {

		} else if (postJSON.postSubtitle) {

		}else if (postJSON.postSubtitle) {

		}else if (postJSON.postSubtitle) {

		}else if (postJSON.postSubtitle) {

		}else if (postJSON.postSubtitle) {

		}else if (postJSON.postSubtitle) {

		}else if (postJSON.postSubtitle) {

		}
	}
	document.getElementById("creation_page").innerHTML = output;
	linkTags();
}



/* requires Supporter
CHATBOX STUFF
// most of the code from https://goblin-heart.net/sadgrl/learn/articles/create-webform-discord

document.getElementById('send').onclick = function() {
	var request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/1234655149360943105/HQwKVGa1yxG_eApOP4_hJsW4LidJKf4WBfrMYsb1bCbsW9ePbnXg_sOV19a29KTp8enX");
		request.setRequestHeader('Content-type', 'application/json');
	var params = {
		username: document.getElementById("name").value, // you can make this whatever you want
		content: document.getElementById("question").value
	}
	request.send(JSON.stringify(params));

	// below gives your user some helpful feedback letting them know their message has been sent
	alert('message sent!!');
	// below clears the form fields after submission
	document.getElementById("question").value = '';
}
*/