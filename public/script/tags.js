/* THIS SECTION IS FOR STUFF THAT MUST BE UPDATED CONSTANTLY */

// array of post JSONs
const postList = [
"peril_the_adventurer.json",
"amaranth_bio.json",
"borealis_bio.json",
"gharial_bio.json",
"moon_moon_bio.json",
"saguaro_bio.json",
"sierra_bio.json",
"snowreader_bio.json",
"dump_truck.json",
];

// postArray idea taken from Zonelets, i hope to make something requiring less effort in the future but that might need some backend, so it goes to the bottom of the list
const postArray = [
"2024-04-27_Welcome-to-end.site!!!.html",
];

// list of all tags in use
const tagsList = ["2d", "3d", "writing", "music", "games", "other", "dragon", "wof", "pride", "2023", "2024", "oc-amaranth", "oc-borealis", "oc-gharial", "oc-moon_moon", "oc-saguaro", "oc-sierra", "oc-snowreader", "webdev"];
tagsList.sort();


/* ONTO THE FUNCTIONS!!! */

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