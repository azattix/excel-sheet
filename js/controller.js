class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.model.bindColSizeChanged(this.view.appendColTitle, this.view.removeColTitle);
		this.model.setDefaultColSize();
		this.view.bindColSize(this.onColSizeChanged);
	}

	onColSizeChanged = x => {
    this.model.resizeCols(x);
  }
}

const app = new Controller(new Model(), new View('#app'));