// postArray idea taken from Zonelets, i hope to make something requiring less effort in the future but that might need some backend, so it goes to the bottom of the list
const postArray = [
"2024-04-27_Welcome-to-end.site!!!.html",
];

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

// link tags on posts to their correct Tag Pages
function linkTags() {
  const rawList = document.getElementById("tags").innerHTML;
  const tagArray = rawList.replace("tags: ", "").split(",");
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
async function parsePost(url) {
	const response = await fetch(url);
	const postJSON = await response.json();
	let output = "";
	if (postJSON.postType == "2d" || "3d") { // same formatting for 2D and 3D
		output += `
		<div class="creation-side">
			<p>${postJSON.postTitle}</p>
		`;
		if (postJSON.postTimelapse) output += `<iframe src="${embedYoutube(postJSON.postTimelapse)}" frameborder="0" allowfullscreen></iframe>`;
		output += `
			<p class="creation-image-desc">
			  ${postJSON.postText}
			</p>
			<p id="tags">tags: ${postJSON.postTags}</p>
		</div>
		<img class="creation-image" src="/pages/projects/${postJSON.postType}/resources/${postJSON.postContent}"/>
		`;
	}  else if (postJSON.postType == "writing") { // Writing has unique formatting
		output += `
			<h1 class="creation-title">${postJSON.postTitle}</h1>
		`;
		if (postJSON.postSubtitle) {output += `<h2 class="creation-subtitle">${postJSON.postSubtitle}</h2>`;}
		output += `
			<h3 class="creation-date">${postJSON.postDate}</h3>
			<p id="tags">${postJSON.postTags}</p>
		`;
		if (postJSON.postLink) {output += `<h2 class="creation-subtitle" style="margin:0;"><a href="${postJSON.postLink}" target="blank">alternative link</a></h2>`;}
		output += `
			<p>${postJSON.postText}</p>
		`;
	} else if (postJSON.postType == ("music" || "games")) { // same formatting for Music and Games
		output += `
			<h1 class="creation-title">${postJSON.postTitle}<h1>
			<h3 class="creation-date">${postJSON.postDate}</h3>
			<p id="tags">${postJSON.postTags}</p>
			<h2 class="creation-subtitle" style="margin:0;"><a href="${postJSON.postLink}" target="blank">alternative link</a></h2>
			<p>${postJSON.postText}</p>
		`;
	}  else { // Other type Creations
		if (postJSON.postTitle) {
			output += `<h1 class="creation-title">${postJSON.postTitle}<h1>`;
		} else if (postJSON.postSubtitle) {
			output += `<h2 class="creation-subtitle">${postJSON.postSubtitle}</h2>`;
		}else if (postJSON.postDate) {
			output += `<h3 class="creation-date">${postJSON.postDate}</h3>`;
		}else if (postJSON.postTags) {
			output += `<p id="tags">${postJSON.postTags}</p>`;
		}else if (postJSON.postLink) {
			output += `<h2 class="creation-subtitle" style="margin:0;"><a href="${postJSON.postLink}" target="blank">alternative link</a></h2>`;
		}else if (postJSON.postTimelapse) {
			output += `<iframe src="${embedYoutube(postJSON.postTimelapse)}" frameborder="0" allowfullscreen></iframe>`;
		}/*else if (postJSON.postFile) {	MISC FILETYPES NOT IMPLEMENTED + NEOCITIES FILE RESTRICTIONS MAKE THIS KINDA USELESS (MAYBE JUST LINK TO A DOWNLOAD??)
			output += ``;
		}*/else if (postJSON.postText) {
			output += `<p>${postJSON.postText}</p>`;
		}
	}
	document.getElementById("creation_page").innerHTML = output;
	linkTags();
}