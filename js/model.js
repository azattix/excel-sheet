/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.maxColSize = 100;
    this.colSize = 26;
    this.rowSize = 30;
    this.cellWidth = 70;
    this.commitX = this.cellWidth;
  }

  /**
   * Respond to callbacks in the model
   * @param callback
   */
  bindSheetSizeChanged(callback) {
    this.$ = callback;
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
    let i, j;

    for (i = 1; i <= this.colSize; i++) {
      this.$.appendColTitle(this.convertToTitle(i));
    }

    for (i = 1; i <= this.rowSize; i++) {
      this.$.appendRaw();
      // +1 for extra cell, first cell for numbers
      for (j = 1; j <= this.colSize+1; j++) {
        this.$.appendCol();
      }
      this.$.assignRawNumber(i);
    }
  }

  /**
   * Change the number of columns increasingly or decreasingly
   * @param x
   */
  resizeSheet({ x }) {
    if ((-x / this.commitX) >= 1 && this.colSize <= this.maxColSize) {
      this.$.appendColTitle(this.convertToTitle(++this.colSize));

      for (let j = 0; j < this.rowSize; j++) {
        this.$.appendColByRawId(j);
      }

      this.commitX += this.cellWidth;
    }
    else if (this.commitX + x > this.cellWidth) {

      for (let j = 0; j < this.rowSize; j++) {
        this.$.removeRowCol(j);
      }

      this.$.removeColTitle();
      this.commitX -= this.cellWidth;
      this.colSize--;
    }
  }
}