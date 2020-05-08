class Model {
  constructor() {
    this.lastColTitleId = 16;
    this.cellWidth = 100;
    this.commitX = this.cellWidth;
  }

  bindColSizeChanged(callback1, callback2) {
    this.onColSizeGrow = callback1;
    this.onColSizeReduce = callback2;
  }

  convertToTitle(n) {
    // -1 for 0-based to 1-based indexing
    let s = String.fromCharCode('A'.charCodeAt(0) + n % 26);
		return !n ? '' : this.convertToTitle(Math.floor(--n / 26)) + s;
	}

  setDefaultColSize() {
    let i;
    for (i = 1; i <= this.lastColTitleId; i++) {
      this.onColSizeGrow(this.convertToTitle(i));
    }
  }

  resizeCols(x) {
    if (parseInt(-x / this.commitX) === 1) {
      this.onColSizeGrow(this.convertToTitle(this.lastColTitleId++));
      this.commitX += this.cellWidth;
    } 
    else if (this.commitX + x > 100) {
      this.onColSizeReduce();
      this.commitX -= this.cellWidth;
    }
  }
}