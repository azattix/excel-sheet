class Navigator {
  constructor() {
    this.navigator = document.createElement('input');
    this.navigator.setAttribute('id', 'column-search');
    this.navigator.type = 'text';
    this.navigator.value = 'A1';
  }

  setVal(val) {
    this.navigator.value = val;
  }

  getComponent() {
    return this.navigator;
  }

  click() {
    this.navigator.addEventListener('click', function() {
      // Select all text inside of input
      this.setSelectionRange(0, this.value.length);
    });
  }

  navigate(handle) {
    this.navigator.addEventListener("keyup", function(e) {
      e.preventDefault();

      // on "Enter" press
      if (e.keyCode === 13) {
        if ( isEmpty(this.value) ) {
          return;
        }

        this.value = this.value.toUpperCase();
        handle(this.value);
        this.blur();
      }
    });
  }
}