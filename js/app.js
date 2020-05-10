const model = new Model({
  maxColSize: 100,
  maxRowSize: 100,
  colSize: 20,
  rowSize: 30,
  cellWidth: 70,
  cellHeight: 23,
  commitX: 70,
  commitY: 23,
});

const app = new Controller(model, new View('#app'));