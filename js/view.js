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

		this.inputGroup = this.createElement('div', 'input-group');
		this.navigator = new Navigation();
		this.commandLine = new CommandLine();

		this.table = this.createElement('table');
		this.thead = this.createElement('thead');
		this.tbody = this.createElement('tbody');

		this.inputGroup.append(this.navigator.getComponent(), this.commandLine.getComponent());
		this.table.append(this.thead, this.tbody);
		this.app.append(this.inputGroup, this.table);

		this.rowIndex = 0;
		this.colIndex = 1;
		this.currentCell = null;
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
		this.disActiveCells();
		this.thead.childNodes[col].classList.add('active-cell');
		this.tbody.childNodes[row].children[0].classList.add('active-cell');
		this.tbody.childNodes[row].children[col].classList.add('active-cell');
		this.currentCell = this.tbody.childNodes[row].children[col];
	};

	disActiveCells = () => {
		const activeCell = document.querySelectorAll('.active-cell');

		activeCell.forEach(active => {
			active.classList.remove('active-cell')
		});
	};

	createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

	getElement(selector) {
    return document.querySelector(selector);
  }

	setActive = (e) => {
		if (e.target.classList.contains('row-num')) return;
		if (e.target.classList.contains('active-cell')) return;

		if (e.target.tagName === 'TD') {
			let colTitle = this.thead.childNodes[e.target.cellIndex];
			let rowNumber = e.target.parentElement.firstElementChild;

			this.rowIndex = e.target.parentElement.rowIndex;
			this.colIndex = e.target.cellIndex;
			this.currentCell = this.tbody.childNodes[this.rowIndex].childNodes[this.colIndex];

			this.navigator.setVal(colTitle.textContent + rowNumber.textContent);
			this.commandLine.setVal('');

			this.disActiveCells();

			e.target.classList.add('active-cell'); // clicked cell
			rowNumber.classList.add('active-cell');
			colTitle.classList.add('active-cell');
		}

		if (e.target.tagName === 'INPUT') {
			this.commandLine.setVal(e.target.value);
		}
	};

  bindSheetResize(handle) {
  	window.addEventListener('scroll', () => {
  		handle(this.table.getBoundingClientRect());
  	});
  }

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
				this.setActive(e);
			});

			input.addEventListener('keyup', (event) => {
				// delete item
				if (event.keyCode === 46) {
					e.target.removeChild(e.target.lastChild);
					this.commandLine.setVal('');
					return;
				}
				this.commandLine.setVal(input.value);
			});

  		input.addEventListener('blur', () => {
				if (input.value === '') {
					e.target.removeChild(e.target.lastChild);
				}
			});
		})
	}

	bindNavigation(handle) {
		this.navigator.click();
		this.navigator.navigate(handle);
	}

	bindTranslator() {
  	let input;

  	this.commandLine.keyup((val) => {
			if (!this.currentCell.children.length) {
				input = this.createElement('input', 'input-item');
				input.type = 'text';
				this.currentCell.append(input);
			}

			input.value = val;

			input.addEventListener('focus', (e) => {
				// this.setActive(e);
			});

			input.addEventListener('keyup', () => {
				// delete item
				if (event.keyCode === 46) {
					this.currentCell.removeChild(this.currentCell.lastChild);
					return;
				}
				this.commandLine.setVal(input.value);
			});

			input.addEventListener('blur', () => {
				if (input.value === '') {
					this.commandLine.setVal('');
					this.currentCell.removeChild(this.currentCell.lastChild);
				}
			});
		});
	}
}