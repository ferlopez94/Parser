# Parser
Implementation of a parser through the recursive decay method.

This grammar version implemented corresponds to a language of variables, calls to functions, and arithmetic expressions without priorities. The grammar is as follows:
- EXP -> cte EXP1
- EXP -> cte EXP1, EXP
- EXP -> var EXP1
- EXP -> var EXP1, EXP
- EXP -> (EXP) EXP1
- EXP -> var() EXP1
- EXP -> var(EXP) EXP1   
- EXP1 -> op EXP EXP1
- EXP1 -> @

Where @ is empty or null.

In order to indicate to the parser to evaluate an statement, the statement has to end with $.

When a new sentence is to be evaluated, the parser asks to the scanner for a new token. The scanner used along with the parser 
can be found in this repo: [Scanner](https://github.com/ferlopez94/Scanner)

## Tests

     Correct expressions    | Incorrect expressions |
--------------------------- | --------------------- |
5                           | .56                   |
6.67                        | + 5 - 7.8             |
(8)                         | ) + 8                 |
(7.49)                      | 5 + 8                 |
5 + 5                       |                       |
6 - 7.8 / (7)               |                       |
(6 - 7.8 / (7)) + 5 + (8.7) |                       |
5, 6, 7                     | 5, 6,                 |
variable_name               | variable1, variable2, |
variable1, variable2        |                       |
function()                  | function(             |
function(5, variable, 6)    | function(5, var,)     |
5 * (func1(5) - func2(3.5)) |                       |

