var readlineSync = require('readline-sync');
var answer;
var i = 0;
var length = 0;
var wait = true;

var getchar = function() {
  if (i < length) {
    return answer.charAt(i++);
  } else if (i === length) {
    i++;
    return '\n';
  } else {
    wait = true;
  }

  if (wait) {
    console.log('');
    answer = readlineSync.question('');
    length = answer.length;
    i = 0;
    return answer.charAt(i++);
  }
}

module.exports = getchar;
