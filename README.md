# Parser
Implementation of a parser through the recursive decay method.

The grammar implemented corresponds to a language of arithmetic expressions without priorities. The original grammar is as follows:
- EXP -> EXP op EXP
- EXP -> (EXP)
- EXP -> cte

However, it had to be transformed since the grammar is ambiguous because of left recursion. The transformation generates the next the following grammar
on which the recursive decay method is based:
- EXP -> cte EXP1
- EXP -> (EXP) EXP1
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
