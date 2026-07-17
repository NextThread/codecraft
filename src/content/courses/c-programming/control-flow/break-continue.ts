import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "break-continue",
  title: "Break & Continue",
  description: "Exit loops early or skip an iteration.",
  readingTime: 5,
  content: `
# Break & Continue

- **\`break\`** exits the *nearest* loop or switch immediately.
- **\`continue\`** skips the rest of the current iteration and jumps to the next one.

Use them to write cleaner, faster loops — but don't overuse them, because they can make control flow harder to follow.

## Program 1: primes below 20

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int n = 2; n < 20; n++) {
        int is_prime = 1;
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) { is_prime = 0; break; }
        }
        if (!is_prime) continue;   // skip non-primes
        printf("%d ", n);
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
2 3 5 7 11 13 17 19
\`\`\`

## Program 2: stop reading when zero is entered

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, sum = 0;
    while (1) {
        printf("Enter a number (0 to stop): ");
        scanf("%d", &n);
        if (n == 0) break;
        sum += n;
    }
    printf("Sum = %d\\n", sum);
    return 0;
}
\`\`\`

## Program 3: skip multiples of 3

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 15; i++) {
        if (i % 3 == 0) continue;
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
1 2 4 5 7 8 10 11 13 14
\`\`\`
`,
};

export default topic;
