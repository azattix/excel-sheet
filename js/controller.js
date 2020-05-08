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
		this.model.bindSheetSizeChanged(this.view.appendColTitle, this.view.removeColTitle);
		this.view.bindSheetResize(this.onSheetResized);
		this.model.setInitialSheet();
	}

	onSheetResized = x => {
    this.model.resizeSheet(x);
  }
}

new Controller(new Model(), new View('#app'));