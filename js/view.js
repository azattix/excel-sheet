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
	}

	removeColTitle = () => {
		this.colTitle.removeChild(this.colTitle.lastElementChild);
	}

	createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  bindColSize(handle) {
  	window.addEventListener('scroll', () => {
  		handle(this.table.getBoundingClientRect().x);
  	});
  }
}