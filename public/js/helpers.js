function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isEmpty(v) {
  if (isString(v))
    return v === '';
}

function isAlphanumeric(s) {
  const pattern = /^[a-z0-9]+$/i;
  return pattern.test(s);
}

function hasChildren(e) {
  let elem = e.target ? e.target: e;
  return elem.children.length !== 0;
}

function hasTag(e, tag) {
  let elem = e.target ? e.target: e;
  return elem.tagName === tag;
}

function resizableGrid(table) {
 var row = table.getElementsByTagName('thead')[0],
 cols = row ? row.children : undefined;
 if (!cols) return;
 
 var tableHeight = table.offsetHeight;
 
 for (var i=0;i<cols.length;i++){
  var div = createDiv(tableHeight);
  cols[i].appendChild(div);
  cols[i].style.position = 'relative';
  setListeners(div);
 }

 function setListeners(div){
  var pageX,curCol,curColWidth,nxtColWidth;

  div.addEventListener('mousedown', function (e) {
   curCol = e.target.parentElement;
   pageX = e.pageX; 
 
   var padding = paddingDiff(curCol);
 
   curColWidth = curCol.offsetWidth - padding;
  });

  div.addEventListener('mouseover', function (e) {
   e.target.style.borderRight = '2px solid #111';
  })

  div.addEventListener('mouseout', function (e) {
   e.target.style.borderRight = '';
  })

  document.addEventListener('mousemove', function (e) {
   if (curCol) {
    var diffX = e.pageX - pageX;

    curCol.style.minWidth = (curColWidth + diffX)+'px';
   }
  });

  document.addEventListener('mouseup', function (e) { 
   curCol = undefined;
   pageX = undefined;
   nxtColWidth = undefined;
   curColWidth = undefined
  });
 }
 
 function createDiv(height){
  var div = document.createElement('div');
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = '5px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  div.style.userSelect = 'none';
  div.style.height = height + 'px';
  return div;
 }
 
 function paddingDiff(col){
 
  if (getStyleVal(col,'box-sizing') == 'border-box'){
   return 0;
  }
 
  var padLeft = getStyleVal(col,'padding-left');
  var padRight = getStyleVal(col,'padding-right');
  return (parseInt(padLeft) + parseInt(padRight));

 }

 function getStyleVal(elm,css){
  return (window.getComputedStyle(elm, null).getPropertyValue(css))
 }
};