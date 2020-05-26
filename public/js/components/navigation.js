class Navigation {
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

  click(handle) {
    this.navigator.addEventListener('click', function() {
      // Select all text inside of input
      this.setSelectionRange(0, this.value.length);
      handle();
    });
  }

  blur(handle) {
    this.navigator.addEventListener('blur', function() {
      handle();
    });
  }

  navigate(handle, isTyping) {
    this.navigator.addEventListener("keyup", function(e) {
      e.preventDefault();

      // on "Enter" press
      if (e.keyCode === 13) {
        if ( isEmpty(this.value) ) {
          return;
        }

        this.value = this.value.toUpperCase();
        handle(this.value);
        isTyping();
        this.blur();
      }
    });
  }
}