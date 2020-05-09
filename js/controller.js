/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		// Explicit this binding
		this.model.bindSheetSizeChanged({
			appendColTitle: this.view.appendColTitle,
			removeColTitle: this.view.removeColTitle,
			appendCol: this.view.appendCol,
			appendCols: this.view.appendCols,
			removeLastCol: this.view.removeLastCol,
			appendRaw: this.view.appendRaw,
			assignRawNumber: this.view.assignRawNumber,
		});
		this.view.bindSheetResize(this.onSheetResized);
		this.model.setInitialSheet();
	}

	onSheetResized = x => {
    this.model.resizeSheet(x);
  }
}

const app = new Controller(new Model(), new View('#app'));