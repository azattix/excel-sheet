class CommandLine {
  constructor() {
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.setAttribute('id', 'mirror');
  }

  getComponent() {
    return this.input;
  }

  setVal(val) {
    this.input.value = val;
  }

  getVal() {
    return this.input.value;
  }

  keyup(handle) {
    this.input.addEventListener('keyup', () => {
      handle(this.input.value);
    })
  }
}