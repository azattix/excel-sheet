/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.maxColSize = 100;
    this.lastColTitleId = 16;
    this.rowCount = 16;
    this.cellWidth = 100;
    this.commitX = this.cellWidth;
  }

  /**
   * Respond to callbacks in the model
   * @param callback
   */
  bindSheetSizeChanged(callback) {
    this.onColSizeGrow = callback.appendColTitle;
    this.onColSizeReduce = callback.removeColTitle;
    this.onRawSizeGrow = callback.appendCol;
    this.onGrowAddCol = callback.appendRowCol;
    this.onRawColReduce = callback.removeRowCol;
    this.onAppendRaw = callback.appendRaw;
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

    for (i = 1; i <= this.lastColTitleId; i++) {
      this.onColSizeGrow(this.convertToTitle(i));
      this.onAppendRaw();
      // +1 for extra cell, first cell for numbers
      for (j = 1; j <= this.lastColTitleId+1; j++) {
        this.onRawSizeGrow(j);
      }
    }
  }

  /**
   * Change the number of columns increasingly or decreasingly
   * @param x
   */
  resizeSheet(x) {
    if ((-x / this.commitX) >= 1 && this.lastColTitleId <= this.maxColSize) {
      this.onColSizeGrow(this.convertToTitle(++this.lastColTitleId));

      for (let j = 0; j < this.rowCount; j++) {
        this.onGrowAddCol(j);
      }

      this.commitX += this.cellWidth;
    }
    else if (this.commitX + x > this.cellWidth) {

      for (let j = 0; j < this.rowCount; j++) {
        this.onRawColReduce(j);
      }

      this.onColSizeReduce();
      this.commitX -= this.cellWidth;
      this.lastColTitleId--;
    }
  }
}