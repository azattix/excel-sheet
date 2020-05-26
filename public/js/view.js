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
		this.body = this.getElement('body');

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
		this.isTyping = false;
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
		this.commandLine.setVal(this.currentCell.textContent);
		this.colIndex = col;
		this.rowIndex = row;
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
		let elem = e.target;

		if (elem.classList.contains('row-num')) return;
		if (elem.classList.contains('active-cell')) return;
		if (elem.tagName === 'SPAN') elem = elem.parentElement;
		if (elem.tagName === 'TD') {
			let colTitle = this.thead.childNodes[elem.cellIndex];
			let rowNumber = elem.parentElement.firstElementChild;

			this.rowIndex = elem.parentElement.rowIndex;
			this.colIndex = elem.cellIndex;
			this.currentCell = this.tbody.childNodes[this.rowIndex].childNodes[this.colIndex];

			this.navigator.setVal(colTitle.textContent + rowNumber.textContent);

			this.disActiveCells();

			elem.classList.add('active-cell'); // clicked cell
			rowNumber.classList.add('active-cell');
			colTitle.classList.add('active-cell');
		}

		if (elem.tagName === 'INPUT')
			this.commandLine.setVal(elem.value);
		else
			this.commandLine.setVal(elem.textContent);
	};

	addInput(parent) {
		const value = this.createElement('span', 'hide');
		const input = this.createElement('input', 'input-item');
		input.type = 'text';

		const quit = () => {
			if (input.value === '') {
				parent.textContent = '';
			} else {
				input.type = 'hidden';
				value.textContent = input.value;
				value.classList.remove('hide');
			}

			this.isTyping = false;
		};

		parent.append(value, input);
		input.focus();

		input.addEventListener('keyup', (event) => {
			if (event.keyCode === 13) { // enter
				quit();
				return;
			}

			if (event.keyCode === 9) { // tab
				quit();
				return;
			}

			this.commandLine.setVal(input.value);
		});

		input.addEventListener('blur', () => {
			quit();
		});
	}

	startTyping(e) {
		let elem = e.target ? e.target: e;

		if (this.isTyping) {
			if ( hasChildren(elem) ) {
				elem.textContent = '';
			}

			this.addInput(elem);
		} else if (!hasChildren(elem) && hasTag(elem, 'TD')) {
			this.isTyping = true;
			this.addInput(elem);
		} else if ( hasTag(elem,'SPAN') ) {
			elem.classList.add('hide');
			elem.nextElementSibling.type = 'text';
		} else if ( hasTag(e, 'TD')) {
			elem.firstElementChild.classList.add('hide');
			elem.lastElementChild.type = 'text';
		}
	}

  bindSheetResize(handle) {
  	window.addEventListener('scroll', () => {
  		handle(this.table.getBoundingClientRect());
  	});
  }

	bindSetActiveCell() {
		this.tbody.addEventListener('click', this.setActive);
	}

	bindNavigation(handle) {
		this.navigator.click(() => {
			this.isTyping = true;
		});

		this.navigator.blur(() => {
			this.isTyping = false;
		});

		this.navigator.navigate(handle, () => {
			this.isTyping = false;
		});
	}

	onEditing() {
		resizableGrid(this.table);

		this.tbody.addEventListener('dblclick', (e) => {
			this.startTyping(e);
			this.isTyping = true;
		});
	}

	onTyping() {
		this.body.addEventListener('keydown', (e) => {
			// enter
			if (e.keyCode === 13) {
				this.setActiveCell(this.colIndex, this.rowIndex + 1);
				return;
			}

			// tab
			if (e.keyCode === 9) {
				e.preventDefault();
				this.setActiveCell(this.colIndex + 1, this.rowIndex);
				return;
			}

			if (!this.isTyping) {
				this.isTyping = true;
				this.startTyping(this.currentCell);
			}
		})
	}
}