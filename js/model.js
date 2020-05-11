/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.maxColSize = 100;
    this.maxRowSize = 100;
    this.colSize = 20;
    this.rowSize = 30;
    this.cellWidth = 70;
    this.cellHeight = 23;
    this.commitX = this.cellWidth;
    this.commitY = this.cellHeight;
  }

  /**
   * Respond to callbacks in the model
   * @param callback
   */
  bindChanges(callback) {
    this.$ = callback;
  }

  /**
   * Return corresponding column title of given number.
   * Complexity: O(log(n) Space: O(1)
   * @param n
   * @returns {string}
   */
  convertToTitle(n) {
    if (n <= 0) return "";

    const character_offset = 64;
    let columnTitle = "";

    while (n > 0) {
      let remainder = n % 26 === 0 ? 26 : n % 26;
      n = (n - remainder) / 26;
      columnTitle = String.fromCharCode(character_offset + remainder) + columnTitle;
    }

    return columnTitle;
	}

  /**
   * Return corresponding column number of given string
   * Complexity: O(n) Space: O(1)
   * @param s
   * @returns {number}
   */
  titleToNumber(s) {
    let columnNumber = 0;

    for (let i = 0; i < s.length; i++) {
      columnNumber = (columnNumber * 26) + s.charCodeAt(i) - 64;
    }

    return columnNumber;
  }

  /**
   *
   * @param s = {columnTitle:rowId}
   */
  onSearchColumn(s) {
    if (s.trim().length < 2) return false;

    const alphanumericRegex = /^[a-z0-9]+$/i;
    const isAlphanumeric = alphanumericRegex.test(s.trim());

    if (!isAlphanumeric) return false;

    let alphaNumericArray = s.split(/([0-9]+)/); // split numbers from the string and remove last element

    if (alphaNumericArray[0] === '') return false;
    if (alphaNumericArray[1] === '') return false;
    if (alphaNumericArray[2] !== '') return false;
    if (alphaNumericArray[1] < '1') return false;

    let col = this.titleToNumber(alphaNumericArray[0].toUpperCase());
    let row = alphaNumericArray[1] - 1;

    this.$.setActiveCell(col, row);

    return true;
  }

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