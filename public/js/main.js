(function() {
	/**
	 * Appends script to the head of the document
	 * @param src
	 * @returns {Promise<Promise>}
	 */
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			let script = document.createElement("SCRIPT");
			script.src = src;

			script.onload = () => resolve();
			script.onerror = () => reject(new Error(`Script load error for ${src}`));

			document.head.append(script);
		});
	}

	/**
	 * Main function to launch the app
	 */
	function ready() {
		loadScript("js/model.js")
			.then(() => loadScript("js/components/navigation.js"))
			.then(() => loadScript("js/components/commandLine.js"))
			.then(() => loadScript("js/components/saveButton.js"))
			.then(() => loadScript("js/view.js"))
			.then(() => loadScript("js/resizableGrid.js"))
			.then(() => loadScript("js/helpers.js"))
			.then(() => loadScript("js/controller.js"))
			.then(() => {
				console.log("scripts are loaded");
			});
	}

	document.addEventListener("DOMContentLoaded", ready);
})()