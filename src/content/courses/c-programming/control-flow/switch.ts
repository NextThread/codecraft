import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "switch",
  title: "Switch Statement",
  description: "A clean multi-way branch based on a single value.",
  readingTime: 5,
  content: `
# Switch Statement

Use \`switch\` when you want to compare **one variable** against **many constant values**. It is clearer than a long \`if-else if\` chain.

## Syntax

\`\`\`c
switch (expression) {
    case value1:
        // ...
        break;
    case value2:
        // ...
        break;
    default:
        // runs if no case matches
}
\`\`\`

**Rules**

- The expression must evaluate to an integer type (\`int\`, \`char\`, \`enum\`).
- \`case\` labels must be **constant** integer expressions.
- \`break\` prevents *fall-through* into the next case.
- \`default\` is optional but recommended.

## Program 1: simple calculator

\`\`\`c
#include <stdio.h>

int main(void) {
    char op;
    double x, y;

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &op);
    printf("Enter two numbers: ");
    scanf("%lf %lf", &x, &y);

    switch (op) {
        case '+': printf("= %.2f\\n", x + y); break;
        case '-': printf("= %.2f\\n", x - y); break;
        case '*': printf("= %.2f\\n", x * y); break;
        case '/':
            if (y != 0) printf("= %.2f\\n", x / y);
            else        printf("Cannot divide by zero.\\n");
            break;
        default:  printf("Unknown operator.\\n");
    }
    return 0;
}
\`\`\`

## Program 2: day name from number

\`\`\`c
#include <stdio.h>

int main(void) {
    int day;
    printf("Enter day number (1-7): ");
    scanf("%d", &day);

    switch (day) {
        case 1: printf("Monday\\n");    break;
        case 2: printf("Tuesday\\n");   break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n");  break;
        case 5: printf("Friday\\n");    break;
        case 6: printf("Saturday\\n");  break;
        case 7: printf("Sunday\\n");    break;
        default: printf("Invalid day\\n");
    }
    return 0;
}
\`\`\`

## Program 3: vowel or consonant (fall-through)

\`\`\`c
#include <stdio.h>

int main(void) {
    char ch;
    printf("Enter a letter: ");
    scanf(" %c", &ch);

    switch (ch) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
        case 'A': case 'E': case 'I': case 'O': case 'U':
            printf("Vowel\\n");
            break;
        default:
            printf("Consonant\\n");
    }
    return 0;
}
\`\`\`
`,
};

export default topic;
