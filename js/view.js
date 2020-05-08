class View {
	constructor(app) {
		this.app = this.getElement(app);
		
		this.table = this.createElement('table', 'table');
		this.thead = this.createElement('thead');
		this.tbody = this.createElement('tbody');

		this.tr = this.getTitle();

		this.thead.append(this.tr);
		this.table.append(this.thead, this.tbody);
		this.app.append(this.table);
	}

	updateTitle() {
	}

	getTitle() {
		// const header = ['#', 'A', 'B', 'C'];
		const tr = this.createElement('tr', 'title');

		// header.map(item => {
		// 	const td = this.createElement('th');
		// 	td.textContent = item;
		// 	tr.append(td);
		// });

		for (let i = 1; i <= 15; i++) {
			const title = this.convertToTitle(i);
			const td = this.createElement('th');
			td.textContent = title;
			tr.append(td);
		}

		return tr;
	}

	convertToTitle(n) {
  	if(n < 27) 
      return String.fromCharCode(65 + n - 1);
  }

	createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }
}