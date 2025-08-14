/* THIS SECTION IS FOR STUFF THAT MUST BE UPDATED CONSTANTLY */

// TODO: Migrate postList and tagsList to their own JSON file, for easy editing externally

// array of post JSONs
let postList;

// list of all tags in use
let tagsList;

async function setLists() {
	const dataResponse = await fetch("/resources/data.json");
	const siteData = await dataResponse.json();

	postList = siteData.posts;
	tagsList = siteData.tags;
	tagsList.sort();
	console.log(postList)
}

/* ONTO THE FUNCTIONS!!! */

// TAG SYSTEM IMPLEMENTATION //
async function listTags() {
  	await setLists()
  	for (i=0; i<tagsList.length; i++) {
  	  	const tagList = document.getElementById("tagList");
  	  	const node = document.createElement("li");
  	  	const textnode = document.createTextNode(`<a href="/pages/projects/tags/${tagsList[i]}">${tagsList[i]}</a>`);
  	  	node.appendChild(textnode);
  	  	const testNode = `<li><a href="/pages/projects/tags/${tagsList[i]}.html">${tagsList[i]}</a></li>`;
  	  	tagList.insertAdjacentHTML("beforeend", testNode);
  	}
  	//createTagPage(tagsList[i]); NOT IMPLEMENTED (requires file creation perms, which don't work on Neocities. may implement locally in python)
}

// populate a Tag Page with posts including that tag
async function populateTags(tagName) {
	await setLists()
	document.getElementsByClassName("tagPage")[0].insertAdjacentHTML("afterbegin", `<h1>Tagged: ${tagName}</h1>`)
	for (i=0; i<postList.length; i++) {
		const response = await fetch("/posts/" + postList[i]);
		const postJSON = await response.json();
		const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const monthName = monthArray[postJSON.postDate[1] - 1];
		const thumbnail = `<li><a href="/pages/projects/${postJSON.postType}/${postJSON.postTitle.toLowerCase().replace(/ /g, '_')}.html">${postJSON.postTitle} | ${monthName} ${postJSON.postDate[2]}, ${postJSON.postDate[0]} | ${postJSON.postType}</a></li>`;
		for (n=0; n<postJSON.postTags.length; n++) {
			if (postJSON.postTags[n] === tagName) {
				document.getElementById("pageList").insertAdjacentHTML("beforeend", thumbnail);
			}
		}
	}
}