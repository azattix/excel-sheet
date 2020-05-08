class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}
}

const model = new Model();
const view = new View('#app');
const app = new Controller(model, view);

const table = document.querySelector('.table');
const title = document.querySelector('.title');

const sheetWidth = 100;
let lastX = sheetWidth;

window.onscroll = function() {
	let { x, width } = table.getBoundingClientRect();
	let lastWidth = 0;

	// console.log(table.getBoundingClientRect());

	if (parseInt(-x / lastX) == 1) {
		let td = document.createElement('th');
		td.textContent = model.convertToTitle(model.lastTitleId++);
		title.append(td);
		lastX += sheetWidth;
	} 
	else if (lastX + x > 100) {
		title.removeChild(title.lastElementChild);
		lastX -= sheetWidth;
	}
}

