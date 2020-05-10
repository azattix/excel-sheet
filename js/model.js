/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor(data) {
    this.extend(data)
  }

  extend = (data) => {
    for (let key in data) {
      Object.defineProperty(this, key, {
        value: data[key],
        writable: true
      });
    }
  };

  /**
   * Respond to callbacks in the model
   * @param callback
   */
  bindChanges(callback) {
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
   * Return corresponding column number of given param
   * @param s
   * @returns {number}
   */
  titleToNumber(s) {
    let output = 0;

    for (let i = 0; i < s.length; i++) {
      output = (output * 26) + s.charCodeAt(i) - 64;
    }

    return output;
  }

  splitNumberFromString(s) {
    return s.match(/\d+/g)[0];
  }

  splitLetterFromString(s) {
    return s.match(/[a-zA-Z]+/g)[0];
  }

  onSearchColumn(s) {
    let row = this.splitNumberFromString(s);
    let col = this.titleToNumber(this.splitLetterFromString(s));
    this.$.setActiveCell(col, row-1);
  };

  /**
   * We must have initial number of columns and raws when app is launched
   */
  setInitialSheet() {
    let i, j;

    for (i = 0; i <= this.colSize; i++) {
      this.$.appendColTitle(this.convertToTitle(i));
    }

    for (i = 1; i <= this.rowSize; i++) { // +1 for extra raw for titles
      this.$.appendRaw();
      for (j = 1; j <= this.colSize+1; j++) { // +1 for extra cell for numbers
        this.$.appendCol();
      }
      this.$.assignRawNumber(i);
    }

    this.$.setActiveCell();
  }

  /**
   * Change the number of columns increasingly or decreasingly
   * @param x
   * @param y
   */
  resizeSheet({ x, y }) {
    // horizontal scroll
    if ((-x / this.commitX) >= 1 && this.colSize <= this.maxColSize) {
      this.$.appendColTitle(this.convertToTitle(++this.colSize));
      this.$.appendCols();
      this.commitX += this.cellWidth;
    }
    else if (this.commitX + x > this.cellWidth) {
      this.$.removeLastCol();
      this.$.removeColTitle();
      this.commitX -= this.cellWidth;
      this.colSize--;
    }

    // vertical scroll
    if ((-y / this.commitY) >= 1 && this.rowSize <= this.maxRowSize) {
      this.$.appendRaw();
      for (let j = 1; j <= this.colSize+1; j++) { // +1 for extra cell for numbers
        this.$.appendCol();
      }
      this.$.assignRawNumber(this.rowSize);
      this.commitY += this.cellHeight;
      this.rowSize++;
    }
    else if (this.commitY + y >= this.cellHeight || y === 0) {
      for (let i = 0; i < (this.commitY / -y); i++) {
        this.$.removeLastRow();
        this.commitY -= this.cellHeight;
        this.rowSize--;
      }
    }
  }
}