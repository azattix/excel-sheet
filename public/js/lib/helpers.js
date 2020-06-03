function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isEmpty(v) {
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