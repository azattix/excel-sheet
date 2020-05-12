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