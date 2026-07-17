import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "type-casting",
  title: "Type Casting",
  description: "Converting a value from one type to another.",
  readingTime: 5,
  content: `
# Type Casting

Type casting converts a value from one data type to another.

## Two kinds

- **Implicit** — done automatically by the compiler when types mix in an expression. Also called *type promotion*.
- **Explicit** — you write \`(type) value\` yourself.

## Rules of implicit conversion

Whenever operands of different types are combined, the "smaller" one is promoted:

\`\`\`text
char → short → int → long → long long → float → double → long double
\`\`\`

## Program 1: implicit vs explicit

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 7, b = 2;

    float implicit = a / b;             // int/int -> integer division!
    float explicit = (float)a / b;      // one cast -> real division

    printf("implicit = %.2f\\n", implicit);
    printf("explicit = %.2f\\n", explicit);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
implicit = 3.00
explicit = 3.50
\`\`\`

## Program 2: converting float to int (truncation)

\`\`\`c
#include <stdio.h>

int main(void) {
    float pi = 3.9f;
    int   n  = (int) pi;        // fractional part discarded
    printf("pi = %.2f, n = %d\\n", pi, n);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
pi = 3.90, n = 3
\`\`\`

## Program 3: char to int (ASCII value)

\`\`\`c
#include <stdio.h>

int main(void) {
    char letter = 'A';
    int  ascii  = (int) letter;
    printf("The ASCII code of '%c' is %d\\n", letter, ascii);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
The ASCII code of 'A' is 65
\`\`\`

## Program 4: average of integers

\`\`\`c
#include <stdio.h>

int main(void) {
    int total = 275, count = 4;
    float avg = (float) total / count;
    printf("Average = %.2f\\n", avg);
    return 0;
}
\`\`\`
`,
};

export default topic;
