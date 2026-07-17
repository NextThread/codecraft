import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "if-else",
  title: "If / Else",
  description: "Branching your program with if, else if and else.",
  readingTime: 6,
  content: `
# If / Else

The \`if\` statement lets your program make decisions and choose which code to run.

## Syntax

\`\`\`c
if (condition) {
    // runs when condition is true (non-zero)
} else if (other_condition) {
    // runs when other_condition is true
} else {
    // runs when nothing above matched
}
\`\`\`

In C, any **non-zero** value is treated as true. Zero is false.

## Nested if

An \`if\` inside another \`if\` — useful when you need to check a second condition only after the first passes.

## Program 1: grading system

\`\`\`c
#include <stdio.h>

int main(void) {
    int marks;
    printf("Enter marks (0-100): ");
    scanf("%d", &marks);

    if (marks >= 90)      printf("Grade: A\\n");
    else if (marks >= 75) printf("Grade: B\\n");
    else if (marks >= 50) printf("Grade: C\\n");
    else                  printf("Grade: F\\n");
    return 0;
}
\`\`\`

**Sample run**
\`\`\`text
Enter marks (0-100): 82
Grade: B
\`\`\`

## Program 2: even or odd

\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    if (n % 2 == 0) printf("%d is even.\\n", n);
    else            printf("%d is odd.\\n", n);
    return 0;
}
\`\`\`

## Program 3: largest of three numbers

\`\`\`c
#include <stdio.h>

int main(void) {
    int a, b, c;
    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    int largest = a;
    if (b > largest) largest = b;
    if (c > largest) largest = c;

    printf("Largest = %d\\n", largest);
    return 0;
}
\`\`\`

## Program 4: leap year checker

\`\`\`c
#include <stdio.h>

int main(void) {
    int y;
    printf("Enter year: ");
    scanf("%d", &y);

    if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0))
        printf("%d is a leap year.\\n", y);
    else
        printf("%d is not a leap year.\\n", y);
    return 0;
}
\`\`\`

**Sample runs**
\`\`\`text
Enter year: 2024
2024 is a leap year.

Enter year: 2100
2100 is not a leap year.
\`\`\`
`,
};

export default topic;
