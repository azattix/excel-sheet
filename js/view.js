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
		this.commandLine.setVal(this.currentCell.textContent);
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
			if (!hasChildren(e) && hasTag(e, 'TD')) {
				let value = this.createElement('span', 'hide');
				let input = this.createElement('input', 'input-item');
				input.type = 'text';

				e.target.append(value, input);

				input.focus();

				input.addEventListener('keyup', () => {
					this.commandLine.setVal(input.value);
				});

				input.addEventListener('blur', () => {
					if (isEmpty(input.value)) {
						e.target.textContent = '';
					} else {
						input.type = 'hidden';
						value.textContent = input.value;
						value.classList.remove('hide');
					}
				});

			} else if ( hasTag(e,'SPAN') ) {
				e.target.classList.add('hide');
				e.target.nextElementSibling.type = 'text';
			} else if ( hasTag(e, 'TD')) {
				e.target.firstElementChild.classList.add('hide');
				e.target.lastElementChild.type = 'text';
			}
		})
	}

	bindNavigation(handle) {
		this.navigator.click();
		this.navigator.navigate(handle);
	}

	bindTranslator() {
  	// let input;

  	// this.commandLine.keyup((val) => {
		// 	if (!this.currentCell.children.length) {
		// 		input = this.createElement('input', 'input-item');
		// 		input.type = 'text';
		// 		this.currentCell.append(input);
		// 	}
		//
		// 	input.value = val;
		//
		// 	input.addEventListener('focus', (e) => {
		// 		// this.setActive(e);
		// 	});
		//
		// 	input.addEventListener('keyup', () => {
		// 		// delete item
		// 		if (event.keyCode === 46) {
		// 			this.currentCell.removeChild(this.currentCell.lastChild);
		// 			return;
		// 		}
		// 		this.commandLine.setVal(input.value);
		// 	});
		//
		// 	input.addEventListener('blur', () => {
		// 		if (input.value === '') {
		// 			this.commandLine.setVal('');
		// 			this.currentCell.removeChild(this.currentCell.lastChild);
		// 		}
		// 	});
		// });
	}
}