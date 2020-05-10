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

		this.commandLine = this.createElement('div');
		this.inputSearch = this.createElement('input');
		this.inputMirror = this.createElement('input');

		this.inputSearch.type = 'text';
		this.inputSearch.value = 'A1';
		this.inputMirror.type = 'text';

		this.table = this.createElement('table');
		this.thead = this.createElement('thead');
		this.tbody = this.createElement('tbody');

		this.commandLine.append(this.inputSearch, this.inputMirror);
		this.table.append(this.thead, this.tbody);
		this.app.append(this.commandLine, this.table);
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

	setActiveCell = (col = 1, row = 0) => {
		this.thead.childNodes[col].classList.add('active-cell');
		this.tbody.childNodes[row].children[0].classList.add('active-cell');
		this.tbody.childNodes[row].children[col].classList.add('active-cell');
	};

	disActiveCells = () => {
		const activeCell = document.querySelectorAll('.active-cell');

		activeCell.forEach(active => {
			active.classList.remove('active-cell')
		});
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
  		// console.log(this.table.getBoundingClientRect())
  	});
  }

  setActive = (e) => {
		if (e.target.classList.contains('row-num')) return;
		if (e.target.classList.contains('active-cell')) return;

		if (e.target.tagName === 'TD') {
			let colTitle = this.thead.childNodes[e.target.cellIndex];
			let rowNumber = e.target.parentElement.firstElementChild;

			this.inputSearch.value = colTitle.textContent + rowNumber.textContent;

			this.disActiveCells();

			e.target.classList.add('active-cell'); // clicked cell
			rowNumber.classList.add('active-cell');
			colTitle.classList.add('active-cell');
		}
	};

	bindSetActiveCell() {
		this.tbody.addEventListener('click', this.setActive);
	}

	bindDoubleClick() {
  	this.tbody.addEventListener('dblclick', (e) => {
  		if (e.target.children.length) return;

  		let input = this.createElement('input', 'input-item');
  		input.type = 'text';
  		e.target.append(input);
  		input.focus();

			input.addEventListener('focus', () => {
				this.inputMirror.value = input.value;
				this.setActive(e);
			});

			input.addEventListener('keyup', () => {
				this.inputMirror.value = input.value;
			});

  		input.addEventListener('blur', () => {
				this.inputMirror.value = '';

				if (input.value === '') {
					e.target.removeChild(e.target.lastChild);
				}
			});
		})
	}

	bindColumnSearch(handle) {
		this.inputSearch.addEventListener("keyup", (e) => {
			// "Enter" key on the keyboard
		  if (e.keyCode === 13) {
				if (!this.inputSearch.value) return;
				e.preventDefault();
		    this.disActiveCells();
		    handle(this.inputSearch.value);
		  }
		});
	}
}