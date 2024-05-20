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