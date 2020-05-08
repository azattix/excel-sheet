function loadScript(src) {
	const script = document.createElement("SCRIPT");
	script.src = src;
	document.body.appendChild(script);  
}

function ready() {
	loadScript('js/model.js');
	loadScript('js/view.js');
	loadScript('js/controller.js');
} 

document.addEventListener("DOMContentLoaded", ready);