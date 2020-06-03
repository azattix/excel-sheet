class SaveButton {
	constructor() {
		this.button = document.createElement('button');
    this.button.setAttribute('id', 'save-button');
    this.button.textContent = 'Save';
	}

	getComponent() {
    return this.button;
  }

  save(handle) {
  	this.button.addEventListener('click', () => {
  		handle();
  	})
  }
}

export default SaveButton;