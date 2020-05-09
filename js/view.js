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

		this.table = this.createElement('table');
		this.thead = this.createElement('thead');
		this.tbody = this.createElement('tbody');

		this.table.append(this.thead, this.tbody);
		this.app.append(this.table);
	}

	appendRaw = () => {
		let tr = this.createElement('tr');
		this.tbody.append(tr);
	};

	appendCol = () => {
		let td = this.createElement('td');
		this.tbody.lastChild.append(td);
	};

	appendCols = () => {
		this.tbody.childNodes.forEach(col => {
			col.append(this.createElement('td'));
		})
	};

	appendColTitle = (title) => {
		let th = this.createElement('th');
		th.textContent = title;
		this.thead.append(th);
	};

	assignRawNumber = (i) => {
		this.tbody.lastChild.firstElementChild.textContent = i;
		this.tbody.lastChild.firstElementChild.classList.add('row-num');
	};

	removeColTitle = () => {
		this.thead.removeChild(this.thead.lastChild);
	};

	removeLastCol = () => {
		this.tbody.childNodes.forEach(col => {
			col.removeChild(col.lastChild);
		})
	};

	removeLastRow = () => {
		this.tbody.removeChild(this.tbody.lastChild);
	};

	setActiveCell = () => {
		this.thead.childNodes[1].classList.add('active-cell');
		this.tbody.childNodes[0].children[0].classList.add('active-cell');
		this.tbody.childNodes[0].children[1].classList.add('active-cell');
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
  		handle(this.table.getBoundingClientRect());
  		console.log(this.table.getBoundingClientRect())
  	});
  }

	bindSetActiveCell() {
		this.tbody.addEventListener('click', (e) => {
			if (e.target.tagName === 'TD' && !e.target.classList.contains('row-num')) {
				const activeCell = document.querySelectorAll('.active-cell');

				activeCell.forEach(active => {
					active.classList.remove('active-cell')
				});

				e.target.classList.add('active-cell'); // clicked cell
				e.target.parentElement.firstElementChild.classList.add('active-cell'); // row number
				this.thead.childNodes[e.target.cellIndex].classList.add('active-cell'); // title
			}
		});
	}
}