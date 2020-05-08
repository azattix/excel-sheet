/**
 * @class View
 *
 * Visual representation of the model.
 *
 * @param app
 */
class View {
	constructor(app) {
		this.app = this.getElement(app);
		
		this.table = this.createElement('table', 'table');
		this.thead = this.createElement('thead');
		this.colTitle = this.createElement('tr', 'col-title');
		this.rowNumber = this.createElement('th', 'row-num');
		this.rowNumber.textContent = '#';
		this.tbody = this.createElement('tbody');

		this.colTitle.append(this.rowNumber);
		this.thead.append(this.colTitle);
		this.table.append(this.thead, this.tbody);
		this.app.append(this.table);
	}

	appendColTitle = (title) => {
	 	let th = this.createElement('th');
		th.textContent = title;
		this.colTitle.append(th);
	};

	removeColTitle = () => {
		this.colTitle.removeChild(this.colTitle.lastElementChild);
	};

	/**
	 *
	 * @param tag
	 * @param className
	 * @returns {object}
	 */
	createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

	/**
	 * Return DOM object
	 * @param selector
	 * @returns {object}
	 */
	getElement(selector) {
    return document.querySelector(selector);
  }

	/**
	 * On scroll change the sheet columns size
	 * @param handle
	 */
  bindSheetResize(handle) {
  	window.addEventListener('scroll', () => {
  		handle(this.table.getBoundingClientRect().x);
  	});
  }
}