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
			removeLastRow: this.view.removeLastRow,
			setActiveCell: this.view.setActiveCell,
		});

		this.model.setInitialSheet();
		this.view.bindSheetResize(this.onSheetResized);
		this.view.bindSetActiveCell();
		this.view.bindDoubleClick();
	}

	onSheetResized = x => {
    this.model.resizeSheet(x);
  }
}

const app = new Controller(new Model(), new View('#app'));