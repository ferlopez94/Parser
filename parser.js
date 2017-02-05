/* Implementation of a parser through the recursive decay method.
   The grammar implemented corresponds to a language of variables, calls to
   functions, and arithmetic expressions without priorities.
   The grammar is as follows:

   EXP -> cte EXP1
   EXP -> cte EXP1, EXP
   EXP -> var EXP1
   EXP -> var EXP1, EXP
   EXP -> (EXP) EXP1
   EXP -> var() EXP1
   EXP -> var(EXP) EXP1   
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
  if (token === scanner.INT || token === scanner.FLT) {   // EXP -> cte EXP1
    match(token);   // Recognize constants
    exp1();

    if (token === scanner.COM) {        // EXP -> cte EXP1, EXP
      match(token);
      exp();
    }
  } else if (token === scanner.VAR) {
    match(token);   // Recognize variables

    if (token === scanner.LLP) {
      match(token);

      if (token === scanner.RRP) {      // EXP -> var() EXP1
        match(token);
        exp1();
      } else {                          // EXP -> var(EXP) EXP1
        exp();
        match(scanner.RRP);
        exp1();
      }
    } else {                            // EXP -> var EXP1
      exp1();

      if (token === scanner.COM) {      // EXP -> var EXP1, EXP
        match(token);
        exp();
      }
    }
  } else if (token === scanner.LLP) {   // EXP -> (EXP) EXP1
    match(token);   // Recognize delimiter left parenthesis
    exp();
    match(scanner.RRP);
    exp1();
  } else {
    if (token === scanner.END) {
      console.log('The expression was not terminated correctly');
    } else {
      console.log('The expression was not initiated correctly');
    }
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
