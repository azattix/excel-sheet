class Model {
  constructor() {
    this.data = [
      ['Peter', 'Griffin', '$100'],
      ['Lois', 'Griffin', '$100'],
      ['Joe', 'Griffin', '$100'],
      ['Cleveland', 'Griffin', '$100'],
    ];
    this.lastTitleId = 16;
  }

  convertToTitle(N) {
  	// -1 for 0-based to 1-based indexing
		return !N ? '' : this.convertToTitle(Math.floor(--N / 26)) + String.fromCharCode('A'.charCodeAt(0) + N % 26);
	}

  // convertToTitle(n) {
  //   // if(n < 27) {
  //   // 	this.lastTitleId++;
  //   //    return String.fromCharCode(65 + n - 1);
  //   // }

  //   let s = [];

  //   while (n-- > 0){
  //     // s.append((char)(n % 26 + 'A'));
  //     s.push(String.fromCharCode(n % 26 + 65)); 
  //     n /= 26; 
  //   }

  //   return s.reverse().join('');
  // }

  titleToNumber(s) {
    let output = 0;

    for (let i = 0; i < s.length; i++) {
      output = (output * 26) + s.charCodeAt(i) - 64;
    }

    return output;
  }
}