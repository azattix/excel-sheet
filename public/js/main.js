/**
 * Appends script to the head
 * @param src
 * @returns {Promise<Promise>}
 */
function loadScript(src) {
	return new Promise((resolve, reject) => {
		let script = document.createElement('SCRIPT');
		script.src = src;

		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error(`Script load error for ${src}`));

		document.head.append(script);
	});
}

/**
 * Main function to launch the app
 */
function ready() {
	loadScript('js/model.js')
		.then(script => loadScript("js/components/navigation.js"))
		.then(script => loadScript("js/components/commandLine.js"))
		.then(script => loadScript("js/view.js"))
		.then(script => loadScript("js/helpers.js"))
		.then(script => loadScript("js/controller.js"))
		.then(script => {
			// scripts are loaded, we can use functions declared there
			console.log('scripts are loaded');
		});
}

document.addEventListener("DOMContentLoaded", ready);