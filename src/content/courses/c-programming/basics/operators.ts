import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "operators",
  title: "Operators",
  description: "Arithmetic, relational, logical, bitwise and assignment operators.",
  readingTime: 7,
  content: `
# Operators

Operators tell the compiler to perform an operation on one or more **operands**.

## Categories

| Category | Examples |
|----------|----------|
| Arithmetic | \`+ - * / %\` |
| Relational | \`== != > < >= <=\` |
| Logical | \`&& || !\` |
| Bitwise | \`& | ^ ~ << >>\` |
| Assignment | \`= += -= *= /= %=\` |
| Increment/Decrement | \`++ --\` |
| Conditional (ternary) | \`? :\` |
| \`sizeof\` | returns size in bytes |
| Comma | \`,\` |

## Precedence highlights

- \`()\` \`[]\` \`->\` — highest
- \`* /\` before \`+ -\`
- Comparisons before \`&&\` before \`||\`
- \`=\` and its family — lowest (right-to-left)

When in doubt, use parentheses.

## Program 1: arithmetic and relational

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 3;

    printf("a + b  = %d\\n", a + b);
    printf("a - b  = %d\\n", a - b);
    printf("a * b  = %d\\n", a * b);
    printf("a / b  = %d   (integer division)\\n", a / b);
    printf("a %% b  = %d\\n", a % b);

    printf("a > b  = %d\\n", a > b);   // 1 = true
    printf("a == b = %d\\n", a == b);  // 0 = false
    return 0;
}
\`\`\`

## Program 2: logical and ternary

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 20;
    int has_id = 1;

    if (age >= 18 && has_id) {
        printf("Entry allowed.\\n");
    }

    int a = 15, b = 42;
    int max = (a > b) ? a : b;
    printf("Max = %d\\n", max);
    return 0;
}
\`\`\`

## Program 3: bitwise operations

\`\`\`c
#include <stdio.h>

int main(void) {
    unsigned int a = 12;   // 1100
    unsigned int b = 10;   // 1010

    printf("a & b  = %u   (AND)\\n", a & b);   // 1000 = 8
    printf("a | b  = %u   (OR) \\n", a | b);   // 1110 = 14
    printf("a ^ b  = %u   (XOR)\\n", a ^ b);   // 0110 = 6
    printf("~a     = %u   (NOT)\\n", ~a);
    printf("a << 2 = %u   (left shift)\\n",  a << 2);  // 48
    printf("a >> 1 = %u   (right shift)\\n", a >> 1);  // 6
    return 0;
}
\`\`\`

## Program 4: increment and compound assignment

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 5;

    printf("x++ = %d\\n", x++);   // prints 5, then x becomes 6
    printf("x   = %d\\n", x);     // 6
    printf("++x = %d\\n", ++x);   // x becomes 7, prints 7

    x += 3;                       // x = 10
    x *= 2;                       // x = 20
    printf("Final x = %d\\n", x);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
x++ = 5
x   = 6
++x = 7
Final x = 20
\`\`\`
`,
};

export default topic;
