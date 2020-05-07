class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		console.log('Controller');
	}
}

const model = new Model();
const view = new View('#app');
const app = new Controller(model, view);