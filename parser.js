/* Implementation of a parser through the recursive decay method.
   The grammar implemented corresponds to a language of arithmetic expressions
   without priorities.
   The original grammar is as follows:
   EXP -> EXP op EXP
	 EXP -> (EXP)
	 EXP -> cte

   However, it had to be transformed since the grammar is ambiguous because of
   left recursion. The transformation generates the next the following grammar
   on which the recursive decay method is based:
   EXP -> cte EXP1
	 EXP -> (EXP) EXP1
	 EXP1 -> op EXP EXP1
	 EXP1 -> @

   Where @ is empty or null.
*/
const scanner = require('./scanner');
var token;

parser();

function parser() {
  token = scanner.getToken();
  exp();

  if (token === scanner.END) {
    console.log('Well-contructed expression!');
  } else {
    console.log('The expression was not terminated correctly');
    process.exit();
  }
}

function exp() {
  if (token === scanner.INT || token === scanner.FLT) {
    match(token);   // Recognize constants
    exp1();
  } else if (token === scanner.LLP) {
    match(token);   // Recognize delimiter left parenthesis
    exp();
    match(scanner.RRP);
    exp1();
  } else {
    console.log('The expression was not initiated correctly')
    process.exit();
  }
}

function exp1() {
  if (token === scanner.BOP) {
    match(token);   // Recognize binary operator
    exp();
    exp1();
  }
}

function match(tokenExpected) {
  if (token === tokenExpected) {
    token = scanner.getToken();
  } else {
    console.log('Unexpected token');
    process.exit();
  }
}
