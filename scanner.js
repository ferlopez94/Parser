/* Implementation of a scanner by coding a Finite Deterministic Automaton
   as a Transition Matrix.
*/
const getchar = require('./getchar.js');

const INT = 100;  // Integer number
const FLT = 101;  // Float number
const BOP = 102;  // Binary operator
const LLP = 103;  // Delimiter: left parenthesis
const RRP = 104;  // Delimiter: right parenthesis
const END = 105;  // End of program
const VAR = 106;  // Variable
const COM = 107;  // Separator: comma
const ERR = 200;  // Lexical error: unknown word

// Transition Matrix: FDA coding
// Row = No final state
// Column = Transition
// States > 99 are final states (acceptors)
// Special case: State 200 = ERROR
//            dig  op    (    )   odd  spa   .    $   let   _    ,
const MT = [[   1, BOP, LLP, RRP,   4,   0,   4, END,   5,   5, COM],    // State 0 - Initial state
            [   1, INT, INT, INT,   4, INT,   2, INT,   4,   4, INT],    // State 1 - Integer numbers
            [   3, ERR, ERR, ERR,   4, ERR,   4, ERR,   4,   4, ERR],    // State 2 - First decimal number
            [   3, FLT, FLT, FLT,   4, FLT,   4, FLT,   4,   4, FLT],    // State 3 - Decimal numbers remaining
            [   4, ERR, ERR, ERR,   4, ERR,   4, ERR,   4,   4, ERR],    // State 4 - Error state
            [   5, VAR, VAR, VAR,   4, VAR,   4, VAR,   5,   5, VAR]];   // State 5 - Variables

var read = true;
var character;

function scanner() {
  var state = 0;
  var lexema = '';

  while (true) {
    while (state < 100) {
      if (read) {
        character = getchar();
      } else {
        read = true;
      }

      state = MT[state][filter(character)];
      if (state < 100 && state !== 0) {
        lexema += character;
      }
    }

    switch (state) {
      case INT:
        read = false;
        console.log('Integer', lexema);
        return INT;
      case FLT:
        read = false;
        console.log('Float', lexema);
        return FLT;
      case BOP:
        lexema += character;
        console.log('Binary operator', lexema);
        return BOP;
      case LLP:
        lexema += character;
        console.log('Delimiter', lexema);
        return LLP;
      case RRP:
        lexema += character;
        console.log('Delimiter', lexema);
        return RRP;
      case END:
        console.log('End of program');
        return END;
      case VAR:
        read = false;
        console.log('Variable', lexema);
        return VAR;
      case COM:
        lexema += character;
        console.log('Separator', lexema);
        return COM;
      case ERR:
        read = false;
        console.log('Unexpected token', lexema);
        return ERR;
    }
  }
}

function filter(character) {
  switch(character) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7':case '8': case '9':
			return 0; // Digits
		case '+': case '-': case '*': case '/':
			return 1; // Operators
		case '(':
			return 2; // Delimiter (
		case ')':
			return 3; // Delimiter )
		case ' ': case String.fromCharCode(10): case String.fromCharCode(13):
			return 5; // Blank spaces
		case '.':
			return 6; // Decimal point
		case '$':
			return 7; // End of program
    case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
    case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
    case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
		case 'y': case 'z':
			return 8; // Lowercase letters
    case '_':
      return 9;
    case ',':
      return 10;
		default:
			return 4; // Weird character (illegal)
  }
}

exports.getToken = scanner;

exports.INT = INT;
exports.FLT = FLT;
exports.BOP = BOP;
exports.LLP = LLP;
exports.RRP = RRP;
exports.END = END;
exports.VAR = VAR;
exports.COM = COM;
exports.ERR = ERR;
