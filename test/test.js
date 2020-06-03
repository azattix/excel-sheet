// const model = new Model();

const tests = [
  ['', false],
  [' ', false],
  ['A', false],
  ['7', false],
  ['8a', false],
  ['7A', false],
  ['7 A', false],
  ['A 7', false],
  ['A2', true],
  ['a2', true],
  ['ZZ14', true],
  ['a2a', false],
  ['a0', false],
  ['a10-1', false],
  ['a01', false],
  ['23423423', false],
  ['A-1', false],
  ['./../.2342', false],
];

function isAlphanumeric(s) {
  return /^[a-z0-9]+$/i.test(s);
}

function isString(val) {
  return typeof val === 'string';
}

function isEmpty(v) {
  if (isString(v))
    return v === '';
}

function myFunc(s) {
  if ( !isAlphanumeric( s.trim() ) ) 
  	return false;

  // split numbers and letters from the string into array
  let arr = s.split(/([0-9]+)/);

  if ( isEmpty(arr[0]) || isEmpty(arr[1]) || !isEmpty(arr[2]) ) 
  	return false;

  // Lexicographical order lower
  if (arr[1] < '1') 
  	return false;

  return true;
}

function testInputs(tests, callback) {
	let i, test, output;

	for (i = 0; i < tests.length; i++) {
		test = tests[i][0];
    output = tests[i][1];

    callback(test, output); 
	}
}

describe("onSearchColumn", () => {
	testInputs(tests, (test, output) => {
		it('"' + test + '"', () => {
      assert.equal(myFunc(test), output);
    });
	});
});