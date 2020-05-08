/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.maxColSize = 100;
    this.lastColTitleId = 16;
    this.cellWidth = 100;
    this.commitX = this.cellWidth;
  }

  /**
   * Respond to callbacks in the model
   * @param callback1
   * @param callback2
   */
  bindSheetSizeChanged(callback1, callback2) {
    this.onColSizeGrow = callback1;
    this.onColSizeReduce = callback2;
  }

  /**
   * Return corresponding column title of given number.
   * @param n
   * @returns {string}
   */
  convertToTitle(n) {
    let title = '';

    while(n > 0) {
      n--;
      title += String.fromCharCode(65 + (n % 26));
      n = Math.floor(n / 26);
    }

    return title.split('').reverse().join('');
	}

  /**
   * We must have initial number of columns when app is opened
   */
  setInitialSheet() {
    let i;
    for (i = 1; i <= this.lastColTitleId; i++) {
      this.onColSizeGrow(this.convertToTitle(i));
    }
  }

  /**
   * Change the number of columns increasingly or decreasingly
   * @param x
   */
  resizeSheet(x) {
    if ((-x / this.commitX) >= 1 && this.lastColTitleId <= this.maxColSize) {
      this.onColSizeGrow(this.convertToTitle(++this.lastColTitleId));
      this.commitX += this.cellWidth;
    }
    else if (this.commitX + x > this.cellWidth) {
      this.onColSizeReduce();
      this.commitX -= this.cellWidth;
      this.lastColTitleId--;
    }
  }
}