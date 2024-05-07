// JSON Post Generator
function generateJSON(type) {
    let output = "";

    // diff formatting based on type
    if (type == '2d') {
        // defining unique vars
        const timelapse = document.getElementById("2dTimelapse").value;
        const image = document.getElementById("2dImage").value;
        const title = document.getElementById("2dTitle").value;
        const date = document.getElementById("2dDate").value;
        const text = document.getElementById("2dText").value;
        const tags = document.getElementById("2dTags").value.split(",");

        // formatting the tags like a JSON array
        let tagsOut = "";
        for (i=0; i<tags.length; i++) {
            tagsOut += `"${tags[i]}",`;
        }
        tagsOut = tagsOut.slice(0, tagsOut.length - 1);

        // assembling the output
        output += `{"postType":"${type}","postTitle":"${title}","postDate":"${date}",`;
        // optional timelapse link
        if (timelapse != "") {output += `"postTimelapse":"${timelapse}",`;}
        output += `"postContent":"${image}","postText":"${text}","postTags":[${tagsOut}]}`;
    }
    else if (type == '3d') {
        // defining unique vars
        const timelapse = document.getElementById("3dTimelapse").value;
        const image = document.getElementById("3dImage").value;
        const title = document.getElementById("3dTitle").value;
        const date = document.getElementById("3dDate").value;
        const text = document.getElementById("3dText").value;
        const tags = document.getElementById("3dTags").value.split(",");

        // formatting the tags like a JSON array
        let tagsOut = "";
        for (i=0; i<tags.length; i++) {
            tagsOut += `"${tags[i]}",`;
        }
        tagsOut = tagsOut.slice(0, tagsOut.length - 1);

        // assembling the output
        output += `{"postType":"${type}","postTitle":"${title}","postDate":"${date}",`;
        // optional timelapse link
        if (timelapse != "") {output += `"postTimelapse":"${timelapse}",`;}
        output += `"postContent":"${image}","postText":"${text}","postTags":[${tagsOut}]}`;
    }
    else if (type == 'writing') {
        // defining unique vars
        const subtitle = document.getElementById("writSubtitle").value;
        const link = document.getElementById("writLink").value;
        const title = document.getElementById("writTitle").value;
        const date = document.getElementById("writDate").value;
        const text = document.getElementById("writText").value;
        const tags = document.getElementById("writTags").value.split(",");

        // formatting the tags like a JSON array
        let tagsOut = "";
        for (i=0; i<tags.length; i++) {
            tagsOut += `"${tags[i]}",`;
        }
        tagsOut = tagsOut.slice(0, tagsOut.length - 1);

        // assembling the output
        output += `{"postType":"${type}","postTitle":"${title}","postSubtitle":"${subtitle}","postDate":"${date}","postLink":"${link}","postText":"${text}","postTags":[${tagsOut}]}`;
    }
    else if (type == 'music') {
        // defining unique vars
        const link = document.getElementById("musicLink").value;
        //const file = document.getElementById("musicFile").value;  MUSIC PLAYER NOT IMPLEMENTED YET
        const title = document.getElementById("musicTitle").value;
        const date = document.getElementById("musicDate").value;
        const text = document.getElementById("musicText").value;
        const tags = document.getElementById("musicTags").value.split(",");

        // formatting the tags like a JSON array
        let tagsOut = "";
        for (i=0; i<tags.length; i++) {
            tagsOut += `"${tags[i]}",`;
        }
        tagsOut = tagsOut.slice(0, tagsOut.length - 1);

        // assembling the output
        output += `{"postType":"${type}","postTitle":"${title}","postDate":"${date}","postLink":"${link}","postText":"${text}","postTags":[${tagsOut}]}`;
    }
    else if (type == 'games') {
        // defining unique vars
        const link = document.getElementById("gamesLink").value;
        const title = document.getElementById("gamesTitle").value;
        const date = document.getElementById("gamesDate").value;
        const text = document.getElementById("gamesText").value;
        const tags = document.getElementById("gamesTags").value.split(",");

        // formatting the tags like a JSON array
        let tagsOut = "";
        for (i=0; i<tags.length; i++) {
            tagsOut += `"${tags[i]}",`;
        }
        tagsOut = tagsOut.slice(0, tagsOut.length - 1);

        // assembling the output
        output += `{"postType":"${type}","postTitle":"${title}","postDate":"${date}","postLink":"${link}","postText":"${text}","postTags":[${tagsOut}]}`;
    }
    else {
        // defining unique vars
        const link = document.getElementById("otherLink").value;
        const title = document.getElementById("otherTitle").value;
        const date = document.getElementById("otherDate").value;
        const text = document.getElementById("otherText").value;
        const tags = document.getElementById("otherTags").value.split(",");
        const subtitle = document.getElementById("otherSubtitle").value;
        const timelapse = document.getElementById("otherTimelapse").value;
        const file = document.getElementById("otherFile").value;

        // formatting the tags like a JSON array
        let tagsOut = "";
        for (i=0; i<tags.length; i++) {
            tagsOut += `"${tags[i]}",`;
        }
        tagsOut = tagsOut.slice(0, tagsOut.length - 1);

        // assembling the output
        output += "{";
        if (title != "") {output += `"postTitle":"${title}",`;}
        if (subtitle != "") {output += `"postSubtitle":"${subtitle}",`;}
        if (date != "") {output += `"postDate":"${date}",`;}
        if (timelapse != "") {output += `"postTimelapse":"${timelapse}",`;}
        if (file != "") {output += `"postFile":"${file}",`;}
        if (link != "") {output += `"postLink":"${link}",`;}
        if (text != "") {output += `"postText":"${text}",`;}
        if (tags != "") {output += `"postTags":"${tags}",`;}
        output = output.slice(0, output.length -1);
        output += "}";
    }
    document.getElementById("output").textContent = output;
    console.log("Output: " + output);
}

function toClipboard(value) {
    navigator.clipboard.writeText(value);
}

// TAB & TAB SELECTOR IMPLEMENTATION //
const tabs = document.getElementsByClassName('tab');

if (document.getElementsByClassName('tabSelector')) {
	// hide all tabs
	for (i=0; i<tabs.length; i++) {
		tabs[i].style.display = 'none';
	}
	document.getElementById('2d').style.display = "block";
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