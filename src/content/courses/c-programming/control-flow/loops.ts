import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "loops",
  title: "Loops",
  description: "for, while and do-while loops.",
  readingTime: 7,
  content: `
# Loops

Loops repeat a block of code while a condition is true. C offers three loop forms.

## The three loops

**\`for\` — when you know how many times:**

\`\`\`c
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
\`\`\`

**\`while\` — check condition first:**

\`\`\`c
int i = 0;
while (i < 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

**\`do-while\` — run at least once:**

\`\`\`c
int i = 0;
do {
    printf("%d ", i);
    i++;
} while (i < 5);
\`\`\`

## Program 1: multiplication table

\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}
\`\`\`

**Sample run (n = 3)**
\`\`\`text
3 x 1 = 3
3 x 2 = 6
...
3 x 10 = 30
\`\`\`

## Program 2: sum of first N natural numbers

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, sum = 0;
    printf("Enter N: ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) sum += i;

    printf("Sum from 1 to %d = %d\\n", n, sum);
    return 0;
}
\`\`\`

## Program 3: reverse a number

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, rev = 0;
    printf("Enter a number: ");
    scanf("%d", &n);

    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed = %d\\n", rev);
    return 0;
}
\`\`\`

## Program 4: menu-driven with do-while

\`\`\`c
#include <stdio.h>

int main(void) {
    int choice;
    do {
        printf("\\n1. Hello\\n2. Bye\\n3. Exit\\nChoice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1: printf("Hello!\\n"); break;
            case 2: printf("Goodbye!\\n"); break;
            case 3: printf("Exiting...\\n"); break;
            default: printf("Invalid choice\\n");
        }
    } while (choice != 3);
    return 0;
}
\`\`\`

## Program 5: nested loop — star pyramid

\`\`\`c
#include <stdio.h>

int main(void) {
    int rows = 5;
    for (int i = 1; i <= rows; i++) {
        for (int s = 0; s < rows - i; s++) printf(" ");
        for (int j = 0; j < 2 * i - 1; j++) printf("*");
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Output**
\`\`\`text
    *
   ***
  *****
 *******
*********
\`\`\`
`,
};

export default topic;
