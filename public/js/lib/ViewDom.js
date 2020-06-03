class ViewDom {
	createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

	getElement(selector) {
    return document.querySelector(selector); 
  }
}

export default ViewDom;