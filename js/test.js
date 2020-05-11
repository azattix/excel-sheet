class Test {
  static isString(val) {
    return typeof val === 'string'
  }

  static isNumber(val) {
    return typeof val === 'number';
  }

  static isEmpty(val) {
    if (this.isString(val))
      return val === '';
    else
      return false;
  }

  static isAlphanumeric(s) {
    if (this.isString(s)) {
      const pattern = /^[a-z0-9]+$/i;
      return pattern.test(s.trim());
    } else {
      return false
    }
  }

  static isShortLength(s, len) {
    if (this.isString(s) && this.isNumber(len))
      return s.trim().length < len;
    else
      return false;
  }
}