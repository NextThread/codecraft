import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "recursion",
  title: "Recursion",
  description: "A function that calls itself.",
  readingTime: 6,
  content: `
# Recursion

**Recursion** is when a function calls itself to solve a smaller version of the same problem.

Every recursive function needs two things:

1. A **base case** — a condition that stops the recursion.
2. A **recursive case** — the call to itself on a smaller input.

Without a proper base case you get infinite recursion and a stack overflow.

## How it works (call stack)

Each call gets its own stack frame with its own local variables. Calls stack on top of each other until the base case is reached, then return one by one.

## Program 1: factorial

\`\`\`c
#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;              // base case
    return n * factorial(n - 1);       // recursive case
}

int main(void) {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    printf("%d! = %lld\\n", n, factorial(n));
    return 0;
}
\`\`\`

**Sample run (n = 5)**
\`\`\`text
5! = 120
\`\`\`

## Program 2: Fibonacci

\`\`\`c
#include <stdio.h>

int fib(int n) {
    if (n < 2) return n;               // fib(0)=0, fib(1)=1
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i < 10; i++) printf("%d ", fib(i));
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
0 1 1 2 3 5 8 13 21 34
\`\`\`

## Program 3: sum of digits

\`\`\`c
#include <stdio.h>

int sum_digits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sum_digits(n / 10);
}

int main(void) {
    printf("Sum of digits of 12345 = %d\\n", sum_digits(12345));
    return 0;
}
\`\`\`

## Program 4: power (x^n)

\`\`\`c
#include <stdio.h>

long long power(int x, int n) {
    if (n == 0) return 1;
    return x * power(x, n - 1);
}

int main(void) {
    printf("2^10 = %lld\\n", power(2, 10));
    return 0;
}
\`\`\`

:::warning
Recursion is elegant, but each call uses stack memory. For deep recursion, prefer iteration or increase the stack size.
:::
`,
};

export default topic;
