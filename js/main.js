function appendScript(src) {
	const newScript = document.createElement("SCRIPT");
	newScript.src = src;
	document.body.appendChild(newScript);  
}

function ready() {
	appendScript('js/model.js');
	appendScript('js/view.js');
	appendScript('js/controller.js');
} 

document.addEventListener("DOMContentLoaded", ready);